import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import professorModel from '../models/Professor.model.js';

const login = async (req, res) => {
    const { email, senha } = req.body;

    const professor = await professorModel.findOne({ email }).select('+senha');

    if (!professor) {
        return res.status(404).json({ message: "Professor não encontrado" });
    }

    try {
        const senhaValida = bcrypt.compareSync(senha, professor?.senha);

        if (!senhaValida) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }

        // Geração do token (substitua pela lógica real)
        const token = generateToken({ id: professor?._id, nome: professor?.nome });
        res.status(200).json({ message: "Login bem-sucedido", token });
    } catch (err) {
        res.status(500).json({ error: err.message, message: "Erro ao processar login" });
    }
}

// Se quiser podemos enviar o email ou qualquer informação do professor no token, mas por segurança é melhor enviar apenas o id e buscar as informações do professor no banco de dados quando necessário
const generateToken = ({ id, nome }) => jwt.sign({ id: id, nome: nome }, process.env.JWT_SECRET, { expiresIn: 86400 });

export default {
  login
};