import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import professorModel from '../models/Professor.model.js';

const httpError = (status, message) => Object.assign(new Error(message), { status });

const login = async ({ email, senha } = {}) => {
    if (!email || !senha) {
        throw httpError(400, 'Email e senha são obrigatórios');
    }

    // somente professores ativos podem autenticar
    const professor = await professorModel.findOne({ email, status: true }).select('+senha');

    // mesma mensagem para email inexistente e senha inválida (evita enumeração de usuários)
    if (!professor || !bcrypt.compareSync(senha, professor.senha)) {
        throw httpError(401, 'Credenciais inválidas');
    }

    const token = generateToken({ id: professor._id, nome: professor.nome, papel: professor.papel });
    return { message: 'Login bem-sucedido', token };
}

// O papel é assinado no token para permitir autorização stateless (sem consulta ao banco a cada request).
// Em troca, mudanças de papel só valem após o token expirar (24h); a desativação já bloqueia o login.
const generateToken = ({ id, nome, papel }) => jwt.sign({ id, nome, papel }, process.env.JWT_SECRET, { expiresIn: 86400 });

export default {
  login
};