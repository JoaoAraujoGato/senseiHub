# senseiHub

Sistema de gerenciamento para academias e dojos de artes marciais.

Projeto único: um `package.json`, um `package-lock.json` e um `node_modules` na raiz; o código é dividido em `backend/` (API Node/Express) e `frontend/` (React/Vite).

## Desenvolvimento

Pré-requisito: `.env` na raiz com `MONGO_URI`, `PORT` e `JWT_SECRET` (use `.env.exemple` como base).

```bash
npm install     # instala todas as dependências
npm run dev     # sobe backend (:3000) e frontend (:5173) juntos
```

Outros comandos: `npm run dev:backend`, `npm run dev:frontend`, `npm run build`, `npm run preview`, `npm run lint`, `npm start`.
