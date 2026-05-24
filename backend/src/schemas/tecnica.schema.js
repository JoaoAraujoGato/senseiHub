import mongoose from 'mongoose';
import { ENTITY_INFO } from '../../regras-negocio/constantes/index.js';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const modelName = ENTITY_INFO.ENTITY_INFO_TECNICA.MODEL_NAME;
export const collectionName = ENTITY_INFO.ENTITY_INFO_TECNICA.COLLECTION_NAME;
export const getSchema = function() {
    const TecnicaSchema = new Schema({
        // Dados da tecnica
        nome: {
            type: String,
            required: true,
            unique: true
        },
        nomeTraduzido: {
            type: String,
            required: true,
            unique: true
        },
        // EX: Nage Waza, Katame Waza, etc
        categoria: {
            type: String,
            required: true,
        },
        // EX: Ashi Waza, Te Waza, etc
        subCategoria: {
            type: String,
            required: true,
        },
        faixa: {
            type: ObjectId,
            ref: 'Faixa',
        },
        descricao: {
            type: String,
        },
        videoUrl: {
            type: String,
        },
        dataCadastro: {
            type: Date,
            default: Date.now
        },
    });

    return TecnicaSchema;
}