import mongoose from 'mongoose';
import { ENTITY_INFO } from '../../regras-negocio/constantes/index.js';
import { COR_HEX } from '#shared/rules.js';

const { Schema } = mongoose;

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
            match: [COR_HEX, 'Cor principal deve estar no formato #RRGGBB'],
        },
        corSecundariaHex: {
            type: String,
            validate: {
                validator: (v) => !v || COR_HEX.test(v),
                message: 'Cor secundária deve estar no formato #RRGGBB',
            },
        },
        ordem: {
            type: Number,
            required: true,
        },
        status: {
            type: Boolean,
            default: true
        },
        dataCadastro: {
            type: Date,
            default: Date.now
        },
    });

    return FaixaSchema;
}
