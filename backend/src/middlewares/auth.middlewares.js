// Para adicionar a autenticacao JWT, basta importar e adicionar na rota desejada. Exemplo: router.post('/cadastrar', authMiddleware, api.create);
// O middleware authMiddleware irá verificar se o token JWT é válido antes de permitir o acesso à rota. Se o token for inválido ou ausente, a resposta será 401 Unauthorized.
// O token JWT é gerado no login e deve ser incluído no header Authorization das requisições subsequentes para acessar as rotas protegidas.
// Lembre-se de configurar a variável de ambiente JWT_SECRET com uma chave secreta para assinar os tokens JWT. Essa chave deve ser mantida em segredo e não deve ser compartilhada publicamente.

// O user armazenado no objeto de requisição (req) pode ser usado em outras partes do código para identificar o usuário autenticado e personalizar as respostas ou realizar ações específicas com base no usuário.

import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Não autorizado' });
    }

    const parts = authorization.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Não autorizado' });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                throw new Error('Token inválido');
            }
            return decoded;
        });

        req.usuario = decoded?.id; // Armazena o ID do usuário no objeto de requisição
        req.usuarioPapel = decoded?.papel; // Armazena o papel do usuário no objeto de requisição

        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido' });
    }
};