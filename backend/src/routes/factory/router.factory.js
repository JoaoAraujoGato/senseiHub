import { Router } from 'express';
import {
  validateObjectId,
  validEntity,
  pagination
} from '../../middlewares/global.middlewares.js';
import { authMiddleware } from '../../middlewares/auth.middlewares.js';

/**
  * Factory que gera um Router Express com as rotas CRUD padrão para uma entidade.
  * Rotas customizadas podem ser injetadas via extraRoutes e são registradas antes das padrão.
  *
  * Rotas geradas:
  *   POST   /           → create
  *   GET    /           → getAll    (paginado)
  *   GET    /query      → query     (paginado, filtros via body)
  *   GET    /:id        → getById   (valida ObjectId e entidade)
  *   PATCH  /:id        → update    (valida ObjectId e entidade)
  *   DELETE /:id        → deleteById (valida ObjectId e entidade)
  *
  * @param {Object} params - Parâmetros de configuração do router.
  * @param {Object} params.api - Controllers da entidade gerados pelo apiFactory.
  *                              Deve conter: create, query, getAll, getById, update, deleteById.
  * @param {mongoose.Model} params.model - Model do Mongoose usado na paginação e validação.
  * @param {string} params.entityName - Nome da entidade usado no middleware validEntity.
  *                                     Ex: 'Faixa', 'Professor'.
  * @param {Object} [params.sortOptions={}] - Ordenação padrão aplicada nas rotas paginadas.
  *                                           Segue a sintaxe do Mongoose: { campo: 1 | -1 }.
  *                                           Ex: { categoria: 1, nome: 1 }
  *                                           Pode ser sobrescrito por request via query string:
  *                                           ?sort=campo:asc,outro:desc
  * @param {Function[]} [params.extraRoutes=[]] - Funções que recebem o router e registram
  *                                               rotas customizadas antes das rotas padrão.
  *                                               Ex: [(router) => router.get('/ativo', controller.getAtivos)]
  *
  * @returns {Router} Router Express configurado com as rotas da entidade.
*/
export default function routerFactory({
  api,
  model,
  entityName,
  sortOptions = {},
  extraRoutes = [],
}) {
  const router = Router();

  // custom routes FIRST
  extraRoutes.forEach((registerRoute) => {
    registerRoute(router);
  });

  router.post('/', authMiddleware, api.create);

  router.get('/', authMiddleware, pagination(model, sortOptions), api.getAll);

  router.get('/query', authMiddleware, api.query, pagination(model, sortOptions), api.respond);

  router.get(
    '/:id',
    authMiddleware,
    validateObjectId,
    validEntity(model, entityName),
    api.getById,
  );

  router.patch(
    '/:id',
    authMiddleware,
    validateObjectId,
    validEntity(model, entityName),
    api.update,
  );

  router.delete(
    '/:id',
    authMiddleware,
    validateObjectId,
    validEntity(model, entityName),
    api.deleteById,
  );

  return router;
}