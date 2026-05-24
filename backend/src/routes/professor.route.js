import routerFactory from './factory/router.factory.js';

import api from '../api/professor.api.js';
import model from '../models/Professor.model.js';

import { ENTITY_INFO } from '../../regras-negocio/constantes/entities-info.js';

export default routerFactory({
  api,
  model: model,
  entityName: ENTITY_INFO.ENTITY_INFO_PROFESSOR.MODEL_NAME,
  sortOptions: { nome: 1 },
  extraRoutes: [],
});