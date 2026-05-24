import mongoose from 'mongoose';
import { GENEROS, ENTITY_INFO, STATUS_ATLETA, RESPOSAVEL_PARENTESCO } from '../../regras-negocio/constantes/index.js';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const modelName = ENTITY_INFO.ENTITY_INFO_ATLETA.MODEL_NAME;
export const collectionName = ENTITY_INFO.ENTITY_INFO_ATLETA.COLLECTION_NAME;
export const getSchema = function() {
    const AtletaSchema = new Schema({
        // Dados do atleta
        nome: {
            type: String,
            required: true,
            unique: true
        },
        nomeUsuario: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            validate: [/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/, 'Email inválido'],
        },
        senha: {
            type: String,
            confidentialUserInfo: true,
            select: false,
        },
        dataNascimento: {
            type: Date,
        },
        faixa: {
            type: ObjectId,
            ref: ENTITY_INFO.ENTITY_INFO_FAIXA.MODEL_NAME,
        },
        peso: {
            type: String,
        },
        genero: {
            type: String,
            enum: Object.values(GENEROS).map(g => g.value),
        },
        foto: {
            type: String,
        },
        responsaveis: [{
            nome: {
                type: String,
            },
            contato: {
                type: String,
            },
            parentesco: {
                type: String,
                enum: Object.values(RESPOSAVEL_PARENTESCO).map(p => p.value),
            }
        }],
        descricaoMedica: {
            type: String,
        },
        status: {
            type: String,
            enum: Object.values(STATUS_ATLETA).map(s => s.value),
            default: 'ativo',
        },
        dataCadastro: {
            type: Date,
            default: Date.now
        },
        turmas: [{
            type: ObjectId,
            ref: ENTITY_INFO.ENTITY_INFO_TURMA.MODEL_NAME,
        }]
    });

    AtletaSchema.pre('save', async function(next) {
        if(!this.senha || !this.isModified('senha')) {
            return next();
        }
        // Hash da senha usando bcrypt
        const saltRounds = 10;
        this.senha = await bcrypt.hash(this.senha, saltRounds);

        next();
    });

    return AtletaSchema;
}