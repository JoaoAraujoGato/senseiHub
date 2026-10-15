# Prompt para revisão do Sensei Hub no OpenCode

Este prompt deve ser utilizado no OpenCode com o modelo **DeepSeek V4.1 Flash**. Ele orienta uma revisão técnica e um planejamento inicial sem modificar o código.

```text
Você é um engenheiro de software responsável por revisar o projeto Sensei Hub antes de qualquer alteração.

## Contexto

O Sensei Hub é um sistema de gerenciamento de academias de artes marciais. O projeto possui um frontend React/Vite e um backend Node.js/Express, organizados em diretórios separados:

- `frontend/`: aplicação React com Vite.
- `backend/`: API Node.js com Express, MongoDB/Mongoose, autenticação e Swagger.
- `docs/SENSEI_HUB_CONTEXT.md`: visão funcional, módulos, objetivos, permissões planejadas e decisões pendentes.

Leia o arquivo `docs/SENSEI_HUB_CONTEXT.md` antes de avaliar o projeto. Ele é contexto de produto, não prova de que uma funcionalidade esteja implementada.

Scripts atualmente conhecidos:

- Backend: `npm run dev` executa `nodemon src/index.js`; `npm start` executa `node src/index.js`.
- Frontend: `npm run dev` executa o Vite; `npm run build` gera o build; `npm run lint` executa o ESLint.

## Objetivo desta tarefa

Faça uma revisão técnica e produza um planejamento. NÃO implemente alterações nesta etapa.

A primeira melhoria considerada é permitir iniciar frontend e backend com um único comando executado a partir da raiz do projeto, sem exigir dois terminais. A solução pode envolver scripts no `package.json` raiz, `concurrently`, workspaces ou outra abordagem apropriada, mas a escolha deve ser feita somente depois da análise.

## Procedimento obrigatório

1. Leia `docs/SENSEI_HUB_CONTEXT.md`, `README.md`, `backend/package.json` e `frontend/package.json`.
2. Inspecione a árvore do projeto e os arquivos de configuração relevantes.
3. Verifique o estado do Git antes de analisar qualquer coisa. Não reverta, sobrescreva ou reorganize alterações existentes.
4. Entenda como frontend e backend iniciam, quais portas utilizam, como o frontend chama a API, como variáveis de ambiente são carregadas e se há problemas de CORS ou proxy.
5. Analise a organização das pastas, dependências, scripts, configuração, tratamento de erros, autenticação, validação, acesso a dados e qualidade geral do código.
6. Execute apenas verificações seguras e não destrutivas, como leitura de arquivos, `npm run lint`, `npm run build` e verificações equivalentes. Se um comando precisar de serviços externos, banco, rede ou credenciais, registre a limitação em vez de inventar resultados.
7. Não instale dependências, não edite arquivos, não crie arquivos, não altere `package-lock.json`, não faça commits e não execute comandos destrutivos.
8. Diferencie claramente fatos observados, inferências e recomendações.

## Escopo da análise

### A. Arquitetura atual

- Como frontend, backend, banco e autenticação se relacionam.
- Pontos fortes e riscos da separação atual.
- Duplicações, acoplamentos e responsabilidades mal posicionadas.
- Compatibilidade entre a implementação atual e a visão documentada.

### B. Execução unificada

Investigue especificamente:

- se existe `package.json` na raiz;
- se frontend e backend possuem scripts `dev` compatíveis;
- quais portas são usadas e se podem entrar em conflito;
- se o frontend usa URL fixa, variável de ambiente, proxy do Vite ou outra estratégia;
- se o backend precisa de MongoDB ou outras variáveis para iniciar;
- se uma solução com `concurrently`, npm workspaces ou scripts raiz seria adequada;
- como a solução funcionaria em Linux/macOS e, se relevante, Windows;
- como parar os dois processos, identificar falhas e preservar logs separados;
- se o comando unificado deve ser apenas para desenvolvimento ou também para produção;
- se a solução deve adicionar poucas dependências e manter os lockfiles coerentes.

Não escolha uma solução apenas por ser popular. Compare pelo menos duas alternativas viáveis e recomende uma com justificativa técnica.

### C. Qualidade e riscos

Procure problemas reais, citando arquivo e linha quando possível:

- bugs prováveis ou confirmados;
- erros de configuração;
- falhas de segurança ou autenticação;
- validação insuficiente;
- tratamento de erros inconsistente;
- problemas de manutenção;
- riscos de regressão;
- divergências com `docs/SENSEI_HUB_CONTEXT.md`.

Não transforme preferências pessoais em defeitos. Priorize problemas que afetam funcionamento, segurança, clareza ou evolução.

## Restrições

- Esta é uma etapa de revisão e planejamento; não implemente nada.
- Não altere o comportamento do sistema.
- Não presuma que funcionalidades descritas na documentação já existam.
- Não invente portas, variáveis, endpoints, credenciais ou resultados de comandos.
- Não faça mudanças abrangentes só para melhorar estilo.
- Não recomende controle de permissão apenas no frontend; regras de acesso devem ser aplicadas no backend.
- Preserve alterações locais existentes e considere o estado atual do Git como pertencente ao usuário.

## Formato obrigatório da resposta

Responda em Markdown, em português, usando exatamente esta estrutura:

### 1. Resumo executivo

Até cinco itens com os principais achados e a recomendação geral.

### 2. Estado atual comprovado

Tabela com: área, evidência encontrada, arquivos relevantes e observações.

### 3. Problemas encontrados

Tabela com: ID, severidade (`Crítica`, `Alta`, `Média`, `Baixa`), problema, evidência, impacto e recomendação.

Separe problemas confirmados de pontos que precisam de investigação.

### 4. Análise da execução com um único comando

Descreva o fluxo atual, pré-requisitos, portas, comunicação frontend/backend e limitações. Compare pelo menos duas soluções, incluindo vantagens, desvantagens e impacto em dependências/lockfiles.

### 5. Solução recomendada

Descreva a alternativa escolhida, os arquivos que provavelmente seriam alterados, o comando esperado, o comportamento quando um processo falhar e como validar a mudança. Não escreva código nesta etapa.

### 6. Plano de implementação por etapas

Liste etapas pequenas e ordenadas, com arquivos envolvidos, risco e critério de aceite. A primeira etapa deve tratar da execução unificada; as demais devem ser priorizadas pelos riscos encontrados.

### 7. Plano de validação

Inclua comandos seguros que deverão ser executados depois da implementação, critérios de sucesso, testes manuais e possíveis limitações causadas por banco, rede ou ambiente.

### 8. Dúvidas e decisões pendentes

Liste somente questões que realmente impedem uma decisão segura. Para cada uma, explique qual informação é necessária.

### 9. Conclusão

Informe explicitamente: `REVISÃO CONCLUÍDA — NENHUMA ALTERAÇÃO REALIZADA`.

Ao citar problemas, use caminhos reais do repositório e linhas exatas quando disponíveis. Se não for possível confirmar algo, escreva `não confirmado` e explique como confirmar.
```

## Observação de uso

Este prompt é deliberadamente voltado para a fase de diagnóstico. Depois que o planejamento for revisado e aprovado, uma nova instrução deve autorizar explicitamente a implementação da etapa escolhida.
