import mongoose from 'mongoose';
import { ENTITY_INFO } from '../../regras-negocio/constantes/index.js';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const modelName = ENTITY_INFO.ENTITY_INFO_TURMA.MODEL_NAME;
export const collectionName = ENTITY_INFO.ENTITY_INFO_TURMA.COLLECTION_NAME;
export const getSchema = function() {
    const TurmaSchema = new Schema({
        // Dados da turma
        nome: {
            type: String,
            required: true,
            unique: true
        },
        professorResponsavel: [{
            type: ObjectId,
            required: true,
            ref: ENTITY_INFO.ENTITY_INFO_PROFESSOR.MODEL_NAME,
        }],
        programacao: {
            dias: {
                segunda: { type: Boolean, default: false },
                terca: { type: Boolean, default: false },
                quarta: { type: Boolean, default: false },
                quinta: { type: Boolean, default: false },
                sexta: { type: Boolean, default: false },
                sabado: { type: Boolean, default: false },
                domingo: { type: Boolean, default: false },
            },
            horarioInicio: {
                type: String,
                required: true,
            },
            horarioFim: {
                type: String,
                required: true,
            },
        },
        capacidadeMaxima: {
            type: Number,
            required: true,
        },
        descricao: {
            type: String,
        },
        dataCadastro: {
            type: Date,
            default: Date.now
        },
    });

    return TurmaSchema;
}