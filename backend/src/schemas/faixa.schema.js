import mongoose from 'mongoose';
import { ENTITY_INFO } from '../../regras-negocio/constantes/index.js';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const modelName = ENTITY_INFO.ENTITY_INFO_FAIXA.MODEL_NAME;
export const collectionName = ENTITY_INFO.ENTITY_INFO_FAIXA.COLLECTION_NAME;
export const getSchema = function() {
    const FaixaSchema = new Schema({
        // Dados da faixa
        nome: {
            type: String,
            required: true,
            unique: true
        },
        corPrincipalHex: {
            type: String,
            required: true,
        },
        corSecundariaHex: {
            type: String,
        },
        ordem: {
            type: Number,
            required: true,
        },
        dataCadastro: {
            type: Date,
            default: Date.now
        },
    });

    return FaixaSchema;
}