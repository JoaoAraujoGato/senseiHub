import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import professorModel from '../models/Professor.model.js';

const login = async ({ email, senha }) => {
    const professor = await professorModel.findOne({ email }).select('+senha');

    if (!professor) throw new Error("Professor não encontrado");

    try {
        const senhaValida = bcrypt.compareSync(senha, professor?.senha);

        if (!senhaValida) throw new Error("Credenciais inválidas");

        const token = generateToken({ id: professor?._id, nome: professor?.nome });
        return({ message: "Login bem-sucedido", token });
    } catch (err) {
        throw new Error({ error: err.message, message: "Erro ao processar login"});
    }
}

// Se quiser podemos enviar o email ou qualquer informação do professor no token, mas por segurança é melhor enviar apenas o id e buscar as informações do professor no banco de dados quando necessário
const generateToken = ({ id, nome }) => jwt.sign({ id: id, nome: nome }, process.env.JWT_SECRET, { expiresIn: 86400 });

export default {
  login
};