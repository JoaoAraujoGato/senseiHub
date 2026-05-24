import { ENTITY_INFO } from '../../regras-negocio/constantes/entities-info.js';
import tecnicaModel from '../models/Tecnica.model.js';
import { QUERY_MODES } from '../utils/query.utils.js';
import apiFactory from './factory/api.factory.js';

const baseCrud = apiFactory(tecnicaModel, ENTITY_INFO.ENTITY_INFO_TECNICA.MODEL_NAME, {
    textFields: [ 'nome', 'categoria', 'subcategoria', 'nomeTraduzido' ],
    queryMode: QUERY_MODES.PARTIAL,  
});

export default {...baseCrud};