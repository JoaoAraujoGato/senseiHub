import routerFactory from './factory/router.factory.js';

import api from '../api/tecnica.api.js';
import model from '../models/Tecnica.model.js';

import { ENTITY_INFO } from '../../regras-negocio/constantes/entities-info.js';

export default routerFactory({
  api,
  model: model,
  entityName: ENTITY_INFO.ENTITY_INFO_TECNICA.MODEL_NAME,
  sortOptions: { categoria: 1, subcategoria: 1, nome: 1 },
  extraRoutes: [],
});