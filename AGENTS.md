# AGENTS.md

> Instruções para agentes de IA e devs que trabalham no Sensei Hub.
> Fonte de verdade de **produto**: `docs/SENSEI_HUB_CONTEXT.md`. Uma funcionalidade descrita lá **não** significa implementada — confirme no código.

## 1. O que é o projeto

Sensei Hub é um sistema de gestão para academias e dojos de artes marciais.

É um **projeto único**: existe um só `package.json` na raiz (todas as dependências), um só `package-lock.json` e um só `node_modules`. As pastas dividem o código por camada, não por pacote:

- `backend/` — API Node.js/Express + MongoDB (Mongoose), autenticação JWT e Swagger.
- `frontend/` — SPA React 18 + Vite (styled-components, react-hook-form, axios).

Cada `package.json`/lockfile dentro de `backend/` ou `frontend/` **não existe mais** — não crie de novo.

## 2. Pré-requisitos

- Node.js 18+ (testado em 18.20).
- `.env` na raiz do projeto (copie de `.env.exemple`), contendo:
  - `MONGO_URI` — string do MongoDB Atlas (`mongodb+srv://...`).
  - `PORT` — o padrão no código é `3000`.
  - `JWT_SECRET` — segredo de assinatura dos tokens.

## 3. Comandos

Todos executados **a partir da raiz**:

| Comando | Ação |
|---|---|
| `npm install` | instala todas as dependências do projeto |
| `npm run dev` | sobe backend (`:3000`) e frontend (`:5173`) juntos |
| `npm run dev:backend` | sobe só o backend (nodemon, assistindo só `backend/`) |
| `npm run dev:frontend` | sobe só o frontend (Vite) |
| `npm run build` | build de produção do frontend → `frontend/dist` |
| `npm run preview` | serve o build do frontend |
| `npm run lint` | ESLint no frontend |
| `npm start` | backend sem nodemon (`node backend/src/index.js`) |

Atenção: **não** há scripts de `lint` nem `test` para o backend. A única verificação automatizada é `npm run lint` (frontend).

## 4. Estrutura de pastas

`backend/src/`:

- `api/` — controllers; `factory/api.factory.js` gera o CRUD padrão.
- `routes/` — routers; `factory/router.factory.js` gera as rotas CRUD.
- `models/` e `schemas/` — Mongoose.
- `middlewares/` — `auth.middlewares.js`, `global.middlewares.js`.
- `utils/` — `query.utils.js`, `sort.utils.js`.
- `regras-negocio/constantes/` — enums e `ENTITY_INFO` (nomes de model/coleção).

`frontend/src/`: `pages/`, `components/`, `services/`, `assets/`.

## 5. Convenções

- **ESM** no projeto inteiro (`"type": "module"` no `package.json` da raiz); imports com extensão (`.js` / `.jsx`).
- **Dependências novas** entram no `package.json` da raiz e são instaladas com `npm install` na raiz.
- **Nova entidade no backend** — siga a ordem:
  1. `schemas/<entidade>.schema.js` exportando `modelName`, `collectionName` e `getSchema()`.
  2. `models/<Entidade>.model.js` — `mongoose.model(modelName, getSchema(), collectionName)`.
  3. `api/<entidade>.api.js` — `apiFactory(model, ENTITY_INFO..., { textFields, queryMode })`.
  4. `routes/<entidade>.route.js` — `routerFactory({ api, model, entityName, sortOptions })`.
  5. registrar o router em `src/routes/registerRoutes.js`.
  6. adicionar a entidade em `regras-negocio/constantes/entities-info.js`.
- **Autenticação:** rotas protegidas usam `authMiddleware`. Depois dele, `req.usuario` (id) e `req.usuarioPapel` (papel) ficam disponíveis. O papel é assinado no JWT no login.
- **Erros:** lance erros com `status` (ex.: 400, 401) e deixe o handler global em `src/index.js` responder; não vaze stack trace.
- **Frontend:** componentes com styled-components, chamadas de API em `src/services/`, nomes de domínio em pt-BR.
- Siga os padrões dos arquivos vizinhos e evite comentários desnecessários.

## 6. Gotchas

- **Backend cai sem Mongo:** `src/database/db.js` chama `process.exit(1)` se o `MONGO_URI` não conectar. Um erro `querySrv ENOTFOUND` significa que o host do cluster não resolve em DNS (cluster pausado/excluído ou string errada) — não é bug de código.
- **O backend lê o `.env` da raiz** (via `dotenv`, relativo ao diretório de execução). Rode os comandos sempre a partir da raiz.
- **`GET /<entidade>` exige token** (authMiddleware aplicado no `router.factory`). Sem `Authorization: Bearer <token>` a resposta é `401`.
- **Senha nunca retorna** pela API (`select: false`) e é re-hasheada com bcrypt no cadastro e no update. Atleta pode existir sem senha; professor exige senha.
- **A URL da API é fixa** em `frontend/src/services/faixaServices.js` (`http://localhost:3000`) e não há proxy do Vite. Os demais `services/*.js` estão vazios (ainda não integrados).
- **Sem testes automatizados.** Valide com `npm run lint` e `npm run build`.

## 7. Referências

- Produto e escopo: `docs/SENSEI_HUB_CONTEXT.md`.
- API (Swagger UI): `http://localhost:3000/doc` — fonte em `backend/src/swagger.json`.
