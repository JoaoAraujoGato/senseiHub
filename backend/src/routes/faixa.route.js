import routerFactory from './factory/router.factory.js';

import api from '../api/faixa.api.js';
import model from '../models/Faixa.model.js';

import { ENTITY_INFO } from '../../regras-negocio/constantes/entities-info.js';

export default routerFactory({
  api,
  model: model,
  entityName: ENTITY_INFO.ENTITY_INFO_FAIXA.MODEL_NAME,
  sortOptions: { ordem: 1 },
  extraRoutes: [],
});