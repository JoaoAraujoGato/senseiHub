import routerFactory from './factory/router.factory.js';

import api from '../api/atleta.api.js';
import model from '../models/Atleta.model.js';

import { authMiddleware } from '../middlewares/auth.middlewares.js';

import { ENTITY_INFO } from '../../regras-negocio/constantes/entities-info.js';
import { validateObjectId } from '../middlewares/global.middlewares.js';

export default routerFactory({
  api,
  model: model,
  entityName: ENTITY_INFO.ENTITY_INFO_ATLETA.MODEL_NAME,
  sortOptions: { nome: 1 },
  extraRoutes: [
    (router) => router.get('/faixa/:faixaId', authMiddleware, validateObjectId, api.getByFaixa),
    (router) => router.get('/turma/:turmaId', authMiddleware, validateObjectId, api.getByTurma),
  ],
});