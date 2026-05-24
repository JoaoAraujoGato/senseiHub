import { ENTITY_INFO } from '../../regras-negocio/constantes/entities-info.js';
import faixaModel from '../models/Faixa.model.js';
import { QUERY_MODES } from '../utils/query.utils.js';
import apiFactory from './factory/api.factory.js';

const baseCrud = apiFactory(faixaModel, ENTITY_INFO.ENTITY_INFO_FAIXA.MODEL_NAME, {
    textFields: [ 'nome' ],
    queryMode: QUERY_MODES.PARTIAL,  
});

export default {...baseCrud};