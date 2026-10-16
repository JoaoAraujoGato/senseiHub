# Sensei Hub — Arquitetura e padronização do frontend

> Spec de arquitetura. Descreve as decisões de bibliotecas, padrões de código e o caminho de migração. **Não** significa implementado — é plano.

## 1. Objetivo

Padronizar o código para legibilidade e manutenção: componentes genéricos reutilizáveis, camada de API única (equivalente ao `apiFactory`/`routerFactory` do backend), estado previsível com Redux, formulários consistentes e roteamento de páginas.

## 2. Decisões

| Área | Decisão |
|---|---|
| Estado | **Redux Toolkit + React-Redux + RTK Query** (um só lugar para estado e cache) |
| Formulários | **react-hook-form** (já existe) + **zod** + `@hookform/resolvers` |
| UI/CSS | **styled-components** como base; corrigir a inconsistência do Bootstrap (remover CDN BS4/jQuery) |
| Ícones | consolidar em **react-icons** (remover `bootstrap-icons`) |
| Roteamento | **react-router-dom** |
| API do frontend | **RTK Query** com `baseApi` + `crudEndpoints()` (o "apiFactory") e `routes.js` |
| Backend | **manter** o padrão atual (apiFactory/routerFactory/routes) + segurança |
| Escopo | **refatorar o existente agora** |

> Trade-off assumido: Redux traz mais boilerplate que TanStack Query, mas centraliza estado de cliente e de servidor num só lugar, com DevTools.

## 3. Bibliotecas

**Adicionar (frontend):** `@reduxjs/toolkit`, `react-redux`, `react-router-dom`, `zod`, `@hookform/resolvers`, `react-icons` (já existe), `date-fns`.
**Adicionar (backend):** `helmet`, `express-rate-limit`.
**Adicionar (dev):** `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `supertest`.
**Remover:** `bootstrap`, `@popperjs/core`, `bootstrap-icons` (confirmar ícones); `axios` (substituído pelo `fetchBaseQuery` do RTK Query); CDN do Bootstrap 4 + jQuery/popper/bootstrap JS no `index.html`.

## 4. Arquitetura-alvo do frontend

```
frontend/src/
├── store/
│   ├── index.js            # configureStore (slices + api)
│   └── baseApi.js          # createApi + fetchBaseQuery (Bearer, 401→logout)
├── features/
│   ├── auth/authSlice.js   # token/usuario; login, logout; persistência em localStorage
│   └── faixa/faixaApi.js   # endpoints (injectEndpoints) do módulo
├── services/
│   ├── routes.js           # constantes de endpoint
│   └── crudEndpoints.js    # crudEndpoints(builder, { path, tag })  ← "apiFactory"
├── shared/                 # schemas zod, formatters, constantes
├── routes/                 # AppRoutes.jsx, PrivateRoute.jsx
├── components/
│   ├── ui/                 # Button, Input, Badge, Card, Spinner, EmptyState, ErrorState
│   ├── form/               # Form, FormField, ColorField
│   └── (Table, ModalGenerico, Navbar, SideBar)  [existem]
└── pages/                  # login, faixas, professores, atletas, turmas, tecnicas, dashboard
```

Backend: **estrutura mantida**; adiciona `helmet` + `express-rate-limit` no `index.js`.

## 5. Padrões

### 5.1 Camada de API (o "apiFactory" do front, em RTK Query)
```js
// store/baseApi.js
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Faixa', 'Professor', 'Atleta', 'Turma', 'Tecnica'],
  endpoints: () => ({}),
});

// services/crudEndpoints.js
export const crudEndpoints = (builder, { path, tag }) => ({
  [`get${tag}s`]: builder.query({ query: (params) => ({ url: path, params }), providesTags: [tag] }),
  [`create${tag}`]: builder.mutation({ query: (body) => ({ url: path, method: 'POST', body }), invalidatesTags: [tag] }),
  [`update${tag}`]: builder.mutation({ query: ({ id, ...body }) => ({ url: `${path}/${id}`, method: 'PATCH', body }), invalidatesTags: [tag] }),
  [`remove${tag}`]: builder.mutation({ query: (id) => ({ url: `${path}/${id}`, method: 'DELETE' }), invalidatesTags: [tag] }),
});

// features/faixa/faixaApi.js
export const faixaApi = baseApi.injectEndpoints({
  endpoints: (builder) => crudEndpoints(builder, { path: ROUTES.FAIXA, tag: 'Faixa' }),
});
export const { useGetFaixasQuery, useCreateFaixaMutation, ... } = faixaApi;
```
Nenhuma URL de endpoint fora de `services/routes.js`.

### 5.2 Estado (Redux)
- **slice de auth** (`features/auth/authSlice.js`): `token`, `usuario`; actions `login`/`logout`; token persistido no `localStorage` e reidratado no `configureStore`.
- **RTK Query** cuida do estado de servidor (cache, loading, erro, invalidação).
- `useSelector`/`useDispatch` nos componentes; seletores em `features/*`.

### 5.3 Roteamento
- `/login` público; `/faixas`, `/professores`, ... privados via `PrivateRoute` (checa `store.auth`).
- `SideBar`/`Navbar` passam a usar `NavLink`.

### 5.4 Componentes genéricos
`Button` com variantes por prop (transient props do styled-components):
```jsx
<Button $variant="primary|secondary|ghost|danger" $size="sm|md|lg" $fullWidth icon={...}>
```
Mais `Input`, `Badge`, `Card`, `Spinner`, `EmptyState`, `ErrorState`. Reaproveitar `Table` e `ModalGenerico` (já genéricos).

### 5.5 Formulários
`Form` (wrapper) + `FormField` + zod → resolver RHF. Um schema por entidade:
```js
const faixaSchema = z.object({
  nome: z.string().min(1, 'Obrigatório'),
  ordem: z.coerce.number().int().positive('Deve ser um número positivo'),
  corPrincipalHex: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Formato #RRGGBB'),
  corSecundariaHex: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional().or(z.literal('')),
});
```

### 5.6 Hooks (política)
`useCallback`/`useMemo` **por medição, não por padrão**; `useEffect` só para sincronização externa. Os hooks do RTK Query substituem `useEffect` de busca.

### 5.7 Backend
Mantém `apiFactory`/`routerFactory`. Acrescenta `helmet`, `express-rate-limit` e CORS restrito por env (`CORS_ORIGIN`).

## 6. Correções pontuais incluídas
- Remover BS4 CDN/jQuery/popper do `index.html`; trocar o único uso de classes Bootstrap (`Button.jsx:46` `d-flex ...`) e o ícone `bi bi-box-arrow-right` (`SideBar.jsx:165`).
- Faixas do seed com `corPrincipalHex: "FFFFF"` (inválido) — normalizar o seed ao migrar.
- `prop-types` mantido nas props públicas (regra de lint já ativa).

## 7. Passo a passo

| Fase | Entrega | Arquivos | Risco | Aceite |
|---|---|---|---|---|
| 0 | Instalar deps; corrigir Bootstrap/ícones | `package.json`, `index.html`, `Button.jsx`, `SideBar.jsx`, `main.jsx` | baixo | lint/build OK; sem CDN legado |
| 1 | Roteamento + store/provider | `store/index.js`, `routes/`, `App.jsx`, `main.jsx` | médio | `/login` público; demais exigem login |
| 2 | baseApi + crudEndpoints + faixaApi | `store/baseApi.js`, `services/routes.js`, `crudEndpoints.js`, `features/faixa/faixaApi.js` | baixo | endpoints por entidade sem URL solta |
| 3 | authSlice + login via RTK | `features/auth/authSlice.js`, `LoginPage.jsx` | médio | login/logout; token reidratado |
| 4 | Tela Faixas com RTK Query | `FaixasPage.jsx` (`useGetFaixasQuery`/mutations) | médio | lista/criar/editar/inativar via cache |
| 5 | Design system | `components/ui/*`, refatorar Faixas + `Button.jsx` | médio | Faixas sem style inline; Button com variantes |
| 6 | Formulários (zod) | `components/form/*`, `shared/schemas/faixaSchema.js`, `FaixasModal.jsx` | médio | validação por schema; sem duplicar rules |
| 7 | Migrar Professores | `pages/professores/*`, `features/professor/professorApi.js` | alto | CRUD consistente + login integrado |
| 8 | Migrar Atletas | `pages/atletas/*`, `features/atleta/atletaApi.js` | alto | CRUD + filtros |
| 9 | Migrar Turmas | `pages/turmas/*`, `features/turma/turmaApi.js` | alto | CRUD + relações |
| 10 | Migrar Técnicas | `pages/tecnicas/*`, `features/tecnica/tecnicaApi.js` | médio | biblioteca + busca |
| 11 | Segurança backend | `index.js`, `.env.exemple` | baixo | helmet + rate-limit + CORS env |
| 12 | Testes + script | `vitest.config`, `*.test.jsx`, `backend/**/*.test.js`, `package.json` | médio | 1 teste por camada crítica |
| 13 | Documentar | `AGENTS.md` | baixo | padrões descritos |

## 8. Riscos e mitigações
- **Boilerplate do Redux** → limitar a slices pequenos + RTK Query (sem thunks manuais desnecessários).
- **Migração visual** ao mexer em componentes → validar tela a tela (`npm run lint` + `build` + conferência visual).
- **Rotas**: hoje o frontend não usa rotas; introduzir `react-router` muda o `App.jsx` → fazer na fase 1, isolado.
- **Seed inválido** de faixas → normalizar antes de testar edição.

## 9. Fora de escopo
- Migrar `backend/` para outro framework.
- `react-bootstrap` ou troca de base de UI.
- Paginação de tabelas (fica para quando o volume exigir).

## 10. Observação
Este spec foi escrito para revisão. A implementação só começa após aprovação e o detalhamento em plano bite-sized (skill writing-plans).

## 11. Status de implementação

| Fase | Status |
|---|---|
| 0 — deps, Bootstrap/ícones | **feito** |
| 1 — roteamento + store/provider | **feito** |
| 2 — baseApi + crudEndpoints + faixaApi | **feito** |
| 3 — authSlice + login via RTK | **feito** |
| 4 — tela Faixas com RTK Query | **feito** |
| 5 — design system (`components/ui`) | **feito** |
| 6 — formulários com zod | **feito** |
| 7 — migrar Professores | **feito** (listar/criar/editar) |
| 8 — migrar Atletas | **feito** (listar/criar/editar/inativar; sem `responsaveis[]`) |
| 9 — migrar Turmas | **feito** (listar/criar/editar/excluir) |
| 10 — migrar Técnicas | **feito** (listar/criar/editar/excluir) |
| 11 — segurança backend | **feito** |
| 12 — testes | **feito** (Vitest: schemas, utils, authMiddleware, Button) |
| 13 — documentar | **feito** |

Notas do spec: 12 sem testes de integração com DB (exigiria separar `app` de `index.js`); `supertest` não foi incluído por isso.

Extra feito além do spec: paginação passou a retornar `200` com `results: []` quando vazio (antes `404`).
