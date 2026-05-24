import mongoose from 'mongoose';
import { GENEROS, PAPEIS_PROFESSOR, ENTITY_INFO } from '../../regras-negocio/constantes/index.js';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const modelName = ENTITY_INFO.ENTITY_INFO_PROFESSOR.MODEL_NAME;
export const collectionName = ENTITY_INFO.ENTITY_INFO_PROFESSOR.COLLECTION_NAME;
export const getSchema = function() {
    const ProfessorSchema = new Schema({
        // Dados do professor
        nome: {
            type: String,
            // required: true,
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
            // required: true,
            unique: true,
            validate: [/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/, 'Email inválido'],
        },
        senha: {
            type: String,
            select: false,
            confidentialUserInfo: true,
            required: true 
        },
        dataCadastro: {
            type: Date,
            default: Date.now
        },
        papel: {
            type: String,
            enum: Object.values(PAPEIS_PROFESSOR).map(p => p.value),
            // required: true
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
        fotoUrl: {
            type: String,
        },
        numeroContato: {
            type: String,
        },
        // apenas admin pode alterar
        status: {
            type: Boolean,
            default: true
        }
    });

    ProfessorSchema.pre('save', async function(next) {
        // Hash da senha usando bcrypt
        const saltRounds = 10;
        this.senha = await bcrypt.hash(this.senha, saltRounds);

        next();
    });

    return ProfessorSchema;
}