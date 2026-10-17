# AGENTS.md

> Instruções para agentes de IA e devs que trabalham no Sensei Hub.
> Fonte de verdade de **produto**: `docs/SENSEI_HUB_CONTEXT.md`. Funcionalidade descrita lá **não** significa implementada — confirme no código.
> Arquitetura-alvo do frontend: `docs/ARQUITETURA_FRONTEND.md`.

## 1. O que é o projeto

Sensei Hub é um sistema de gestão para academias e dojos de artes marciais.

É um **projeto único**: existe um só `package.json` na raiz (todas as dependências), um só `package-lock.json` e um só `node_modules`. As pastas dividem o código por camada, não por pacote:

- `shared/` — código usado por **frontend e backend**: `enums.js` (valores/labels) e `rules.js` (regex).
- `backend/` — API Node.js/Express + MongoDB (Mongoose), autenticação JWT e Swagger.
- `frontend/` — SPA React 18 + Vite. Estado com **Redux Toolkit + RTK Query**, rotas com **react-router-dom**, UI com **styled-components**, ícones com **react-icons**.

Cada `package.json`/lockfile dentro de `backend/` ou `frontend/` **não existe mais** — não crie de novo.

## 2. Pré-requisitos

- Node.js 18+ (testado em 18.20).
- `.env` na raiz do projeto (copie de `.env.exemple`), contendo:
  - `MONGO_URI` — string do MongoDB Atlas (`mongodb+srv://...`).
  - `PORT` — o padrão no código é `3000`.
  - `JWT_SECRET` — segredo de assinatura dos tokens.
  - `CORS_ORIGIN` — opcional; origens permitidas (vírgula). Vazio = qualquer origem.

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
| `npm test` | Vitest (frontend + lógica pura do backend) |
| `npm start` | backend sem nodemon (`node backend/src/index.js`) |

Atenção: **não** há scripts de `lint` para o backend. Validação automatizada: `npm run lint` (frontend) e `npm test`.

## 4. Estrutura de pastas

`backend/src/`:

- `api/` — controllers; `factory/api.factory.js` gera o CRUD padrão.
- `routes/` — routers; `factory/router.factory.js` gera as rotas CRUD.
- `models/` e `schemas/` — Mongoose.
- `middlewares/` — `auth.middlewares.js`, `global.middlewares.js`.
- `utils/` — `query.utils.js`, `sort.utils.js`.
- `regras-negocio/constantes/` — enums e `ENTITY_INFO` (nomes de model/coleção).

`frontend/src/`:

- `store/` — `index.js` (configureStore) e `baseApi.js` (RTK Query).
- `features/<mod>/` — `<mod>Slice.js` (estado) e `<mod>Api.js` (endpoints).
- `routes/` — `AppRoutes.jsx`, `PrivateRoute.jsx`.
- `services/` — `routes.js` (constantes de endpoint) e `crudEndpoints.js` (o "apiFactory" do front).
- `components/ui/` — componentes genéricos (`Button`, `Input`, `IconButton`, `Badge`, `Spinner`, `ErrorState`).
- `components/modal/` — `ModalGenerico` aceita `schema` (zod) para validação; schemas em `shared/schemas/`.
- `shared/schemas/` — schemas zod por entidade.
- `components/`, `pages/`, `assets/`.

## 5. Convenções

- **ESM** no projeto inteiro (`"type": "module"` no `package.json` da raiz); imports com extensão (`.js` / `.jsx`).
- **Imports com alias** (evite `../`): no frontend `@/` → `frontend/src` e `@shared/` → `shared` (config em `frontend/vite.config.js` e `vitest.config.js`); no backend `#shared/` → `shared` (campo `imports` do `package.json`).
- **Fonte única** de enums/regras em `shared/`: `enums.js` (`GENEROS`, `PAPEIS_PROFESSOR`, `STATUS_ATLETA`, `RESPOSAVEL_PARENTESCO`, `DIAS_SEMANA`) e `rules.js` (`COR_HEX`, `EMAIL`). Não redefina esses valores em outro lugar — o backend reexporta via `regras-negocio/constantes/`.
- **Dependências novas** entram no `package.json` da raiz e são instaladas com `npm install` na raiz.
- **Nova entidade no backend** — siga a ordem:
  1. `schemas/<entidade>.schema.js` exportando `modelName`, `collectionName` e `getSchema()`.
  2. `models/<Entidade>.model.js` — `mongoose.model(modelName, getSchema(), collectionName)`.
  3. `api/<entidade>.api.js` — `apiFactory(model, ENTITY_INFO..., { textFields, queryMode })`.
  4. `routes/<entidade>.route.js` — `routerFactory({ api, model, entityName, sortOptions })`.
  5. registrar o router em `src/routes/registerRoutes.js`.
  6. adicionar a entidade em `regras-negocio/constantes/entities-info.js`.
- **Nova entidade no frontend** — siga a ordem:
  1. adicionar o endpoint em `services/routes.js` (`ROUTES.*`).
  2. adicionar a tag em `store/baseApi.js` (`tagTypes`).
  3. criar `features/<mod>/<mod>Api.js` usando `crudEndpoints(builder, { path, tag })`.
  4. criar a página e registrá-la em `routes/AppRoutes.jsx` (dentro de `PrivateRoute`).
- **Autenticação:** rotas protegidas usam `authMiddleware`. Depois dele, `req.usuario` (id) e `req.usuarioPapel` (papel) ficam disponíveis. O papel é assinado no JWT no login.
- **Erros:** lance erros com `status` (ex.: 400, 401) e deixe o handler global em `src/index.js` responder; não vaze stack trace.
- **Frontend:** componentes com styled-components, nomes de domínio em pt-BR. Reutilize os componentes de `components/ui/` e os schemas zod de `shared/schemas/` (o `ModalGenerico` recebe `schema`). `useCallback`/`useMemo` **por medição**, e `useEffect` só para sincronização externa (o RTK Query substitui os fetches).
- Siga os padrões dos arquivos vizinhos e evite comentários desnecessários.

## 6. Gotchas

- **Backend cai sem Mongo:** `src/database/db.js` chama `process.exit(1)` se o `MONGO_URI` não conectar. Um erro `querySrv ENOTFOUND` significa que o host do cluster não resolve em DNS (cluster pausado/excluído ou string errada) — não é bug de código.
- **O backend lê o `.env` da raiz** (via `dotenv`, relativo ao diretório de execução). Rode os comandos sempre a partir da raiz.
- **`GET /<entidade>` exige token** (authMiddleware aplicado no `router.factory`). Sem `Authorization: Bearer <token>` a resposta é `401`.
- **Listagem vazia retorna `200` com `results: []`** (não é mais `404`).
- **Senha nunca retorna** pela API (`select: false`) e é re-hasheada com bcrypt no cadastro e no update. Atleta pode existir sem senha; professor exige senha.
- **A URL da API fica em `frontend/src/services/routes.js`** (`API_URL`); o `fetchBaseQuery` injeta o `Bearer` e um `401` numa rota autenticada encerra a sessão. Nada de `axios`.
- **Testes:** `npm test` (Vitest + Testing Library; config em `vitest.config.js`). Cobrem lógica pura (schemas zod, utils) e o `authMiddleware`; o teste de componente usa `// @vitest-environment jsdom`. Não há testes de integração com DB (exigiria separar `app` de `index.js`).
- **Campos `unique` opcionais precisam de `sparse: true`** no Mongoose (`email`, `nomeUsuario`). Sem `sparse`, o segundo documento com o campo ausente colide (null duplicado) e retorna `409`. Ao mudar um índice, rode `Model.syncIndexes()` uma vez.
- **Navegação:** as rotas privadas ficam dentro de `AppLayout` (sidebar + topbar). O menu vem de `frontend/src/routes/navConfig.jsx` (fonte única, reusada pelo título do Topbar); o item ativo usa a classe `.active` do `NavLink`. Páginas ainda não implementadas apontam para `EmConstrucaoPage`.
- **Rotas por convenção:** `/<plural>` = lista, `/<plural>/:id` = detalhe, `/<plural>/novo` = criar, `/<plural>/:id/editar` = editar (ex.: `/professores`, `/professores/:id`, `/professores/novo`, `/professores/:id/editar`). Atletas e Professores seguem isso.
- **Formulários:** o `FormBase` (`components/form/`) concentra RHF + zod + campos, e é reusado tanto pelas páginas de novo/editar quanto pelo `ModalGenerico` (faixas/turmas/técnicas). Campos podem ter `when: (valores) => boolean` para exibir/esconder (ex.: campos condicionais por idade no atleta).
- **Atleta:** `dataNascimento` é obrigatória. **Menor** → `responsaveis[]` (mãe/pai, exige ao menos 1); **maior** → `contatoEmergencia` (relação via `RELACAO_CONTATO`). Campos livres `alergias` e `observacoes` (substituiu `descricaoMedica`). Idade calculada em `frontend/src/shared/idade.js`.
- **Listagens:** Professores em **cards** (clicar no card abre os detalhes); Atletas em tabela com a "lupa". Editar/inativar/excluir ficam nas páginas de detalhe.
- **Excluir professor** limpa referências (remove de `turma.professorResponsavel`), então a turma pode ficar sem professor.

## 7. Referências

- Produto e escopo: `docs/SENSEI_HUB_CONTEXT.md`.
- Arquitetura do frontend: `docs/ARQUITETURA_FRONTEND.md`.
- Cronograma: `docs/IMPLEMENTATION_ROADMAP.md`.
- API (Swagger UI): `http://localhost:3000/doc` — fonte em `backend/src/swagger.json`.
