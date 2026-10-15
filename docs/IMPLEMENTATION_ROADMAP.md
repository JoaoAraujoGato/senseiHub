# Sensei Hub — Cronograma incremental de implementação

## Objetivo deste documento

Este cronograma organiza a evolução do Sensei Hub em pequenas entregas completas. A regra é finalizar um módulo funcional antes de iniciar o próximo: backend, tela, integração, validação e teste rápido.

O cronograma parte do estado observado no projeto: já existem modelos, schemas, APIs, rotas e serviços para faixas, professores, atletas, técnicas e turmas, além de algumas telas React. Porém, a aplicação ainda está em estágio inicial: o `App.jsx` renderiza diretamente a página de faixas, a navegação é visual, muitos itens estão marcados como `WIP` e o fluxo de autenticação ainda precisa ser conectado ao frontend.

Este documento é um plano de execução, não uma afirmação de que todas as etapas já estejam implementadas.

## Regras de execução

Para cada sessão:

1. ler os arquivos do módulo antes de editar;
2. verificar o estado do Git e preservar alterações existentes;
3. fazer uma alteração pequena e coerente;
4. executar validações rápidas;
5. testar manualmente o fluxo principal;
6. registrar o que foi concluído e o que ficou pendente;
7. só então avançar para a próxima sessão.

Uma sessão pode gerar mais de um commit, mas não deve misturar módulos sem necessidade.

## Ordem geral

| Fase | Módulo | Resultado esperado |
|---|---|---|
| 0 | Base de execução e segurança | Projeto inicia de forma previsível e rotas protegidas |
| 1 | Faixas | Cadastro e manutenção de faixas concluídos |
| 2 | Professores | CRUD de professores e login conectados |
| 3 | Atletas | Cadastro, listagem, edição e status de atletas |
| 4 | Turmas | Turmas relacionadas a professores, atletas e horários |
| 5 | Presença | Registro e histórico de presença |
| 6 | Técnicas | Biblioteca de técnicas funcional |
| 7 | Treinos | Rotinas compostas por blocos e técnicas |
| 8 | Dashboard | Indicadores derivados de dados reais |
| 9 | Exames de faixa | Agendamento, participantes e avaliação |
| 10 | Campeonatos | Eventos, participantes e resultados |
| 11 | Financeiro | Mensalidades, pagamentos e histórico |
| 12 | Comunicados | Cadastro e publicação conforme audiência |
| 13 | Configurações e permissões | Perfil, academia e autorização refinada |
| 14 | Qualidade e entrega | Testes, documentação e preparação para publicação |

# Fase 0 — Fundação antes dos módulos

## Sessão 0.1 — Revisão do estado atual

**Tarefas**

- verificar o `git status`;
- confirmar como backend e frontend iniciam;
- identificar portas, variáveis de ambiente, conexão com MongoDB e URL da API;
- executar o lint do frontend;
- executar o build do frontend;
- testar a inicialização do backend sem alterar arquivos;
- registrar falhas reais antes de iniciar o CRUD de faixas.

**Critério de aceite**

Existe um diagnóstico curto com comandos executados, resultados e limitações ambientais.

## Sessão 0.2 — Execução com um comando na raiz

**Tarefas**

- escolher uma estratégia de execução conjunta após comparar alternativas;
- criar scripts raiz somente depois da decisão;
- manter scripts individuais de frontend e backend funcionando;
- garantir encerramento dos dois processos com `Ctrl+C`;
- confirmar que uma falha em um processo aparece claramente no terminal;
- documentar pré-requisitos, especialmente MongoDB e variáveis de ambiente.

**Critério de aceite**

Um comando de desenvolvimento na raiz inicia frontend e backend, com logs identificáveis e sem exigir dois terminais.

## Sessão 0.3 — Autenticação de base

**Tarefas**

- proteger as rotas de listagem e alteração que não sejam públicas;
- confirmar que login retorna token apenas para professor ativo;
- padronizar o uso do middleware de autenticação nas rotas;
- tratar token ausente, inválido e expirado;
- definir estratégia para o papel do usuário;
- manter autorização no backend.

**Decisão recomendada:** assinar no JWT apenas identificadores e dados necessários para o contexto imediato, com expiração curta/moderada e possibilidade de consultar o professor quando a operação exigir autorização sensível. Para permissões críticas, o backend deve validar o usuário e seu papel no banco; não confiar somente em um papel antigo dentro de um token de longa duração. A implementação final deve equilibrar desempenho com revogação rápida.

**Critério de aceite**

Uma requisição sem token recebe `401`, uma requisição com token inválido recebe `401` e uma rota protegida não retorna dados sem autenticação.

# Fase 1 — Faixas

Esta é a primeira entrega funcional de domínio.

## Sessão 1.1 — Contrato do cadastro

- confirmar campos obrigatórios da faixa;
- confirmar formato, cor, ordem/progressão e status;
- validar duplicidade e valores inválidos;
- conferir model, schema, API e rota;
- padronizar respostas de sucesso e erro.

**Teste rápido:** criar uma faixa válida, tentar enviar campo obrigatório ausente e tentar duplicar uma faixa.

## Sessão 1.2 — Listagem e estados da tela

- buscar faixas pela API;
- exibir carregamento, lista vazia e erro;
- mostrar as informações principais;
- remover dados fixos da tela;
- tratar atualização após cadastro.

**Teste rápido:** abrir a tela com dados, sem dados e com backend indisponível.

## Sessão 1.3 — Edição, inativação e conclusão

- abrir modal/formulário com dados existentes;
- editar e validar;
- decidir se “excluir” será exclusão física ou inativação;
- atualizar a listagem após salvar;
- impedir edição de valores inválidos.

**Critério de aceite:** cadastrar, listar, editar, inativar e recarregar faixas sem perder dados.

# Fase 2 — Professores

## Sessão 2.1 — Cadastro de professor

- definir campos: nome, e-mail, telefone, faixa, papel, senha e status;
- validar e-mail e senha;
- armazenar senha somente com hash;
- impedir duplicidade de e-mail;
- testar criação pelo backend.

## Sessão 2.2 — Listagem e edição

- conectar a tela à listagem autenticada;
- exibir papel, faixa, status e contato;
- editar dados não sensíveis;
- controlar alteração de papel e status;
- mostrar estados de carregamento, vazio e erro.

## Sessão 2.3 — Login e sessão no frontend

- criar tela de login;
- armazenar o token de forma coerente com a política de segurança escolhida;
- configurar cliente HTTP para enviar `Authorization: Bearer`;
- redirecionar usuário não autenticado;
- implementar logout;
- exibir dados reais do professor no perfil/sidebar.

## Sessão 2.4 — Remoção administrativa

- restringir remoção ao administrador no backend;
- preferir desativar professor para preservar histórico;
- esconder ou desabilitar a ação no frontend conforme o papel;
- testar instrutor e administrador separadamente.

**Critério da fase:** professor administrador pode gerenciar professores; instrutor pode consultar e editar apenas o permitido; login e logout funcionam.

# Fase 3 — Atletas

## Sessão 3.1 — Cadastro

- confirmar campos pessoais e de contato;
- validar idade/data de nascimento;
- definir status padrão como ativo;
- conectar formulário à API;
- testar erros de validação e duplicidade quando aplicável.

## Sessão 3.2 — Listagem e filtros

- listar atletas autenticados;
- exibir nome, e-mail, faixa, idade, turmas e status;
- implementar filtros por faixa, idade, turma e status;
- tratar paginação ou limite quando o volume crescer.

## Sessão 3.3 — Perfil e edição

- criar perfil detalhado;
- editar dados do atleta;
- mostrar histórico disponível sem inventar dados futuros;
- permitir inativação;
- impedir remoção para instrutor quando a regra estiver ativa.

**Critério da fase:** um atleta pode ser cadastrado, encontrado, filtrado, editado e inativado sem quebrar relações existentes.

# Fase 4 — Turmas

## Sessão 4.1 — Modelo e cadastro

- definir nome, descrição, status, professor, dias, horário, limites e faixa etária;
- validar horário inicial/final e limite de alunos;
- relacionar professor responsável;
- testar criação autenticada.

## Sessão 4.2 — Cards e edição

- substituir dados fixos por API;
- exibir cards com capacidade e tags;
- editar informações;
- ativar/inativar turma;
- tratar turma sem alunos e sem professor definido.

## Sessão 4.3 — Relação com atletas e permissões

- adicionar/remover atleta da turma;
- impedir exceder limite, se essa for a regra;
- aplicar no backend o escopo de visualização por turma;
- permitir visão ampla ao administrador conforme decisão.

**Critério da fase:** turma possui ciclo de vida e relações reais com professor e atletas.

# Fase 5 — Presença

## Sessão 5.1 — Registro rápido

- selecionar turma e data;
- listar atletas da turma;
- marcar presente/ausente;
- salvar em uma operação clara;
- impedir registros duplicados para a mesma turma/data/aluno.

## Sessão 5.2 — Histórico

- filtrar por turma, atleta e período;
- editar registro conforme permissão;
- exibir lista vazia e erro;
- preparar dados para média do dashboard.

**Teste rápido:** registrar presença de uma turma, recarregar, alterar um aluno e consultar o histórico.

# Fase 6 — Técnicas

## Sessão 6.1 — Biblioteca

- cadastrar nome, tipo, categoria, descrição e vídeo;
- validar URL quando preenchida;
- listar e pesquisar técnicas;
- editar e inativar técnica.

## Sessão 6.2 — Qualidade do conteúdo

- definir categorias consistentes;
- impedir duplicidades relevantes;
- exibir link de vídeo com segurança;
- preparar seleção de técnicas em treinos e exames.

# Fase 7 — Treinos

## Sessão 7.1 — Rotina básica

- definir entidade de rotina;
- cadastrar título, objetivo, nível e duração;
- organizar blocos ordenados;
- associar técnicas existentes.

## Sessão 7.2 — Editor de blocos

- adicionar, editar, reordenar e remover blocos;
- informar tempo, instrução e técnica;
- validar duração;
- salvar e reabrir a rotina.

# Fase 8 — Dashboard

- construir primeiro após haver atletas, turmas e presença reais;
- exibir contagens derivadas das APIs;
- definir oficialmente o período da presença média;
- mostrar treinos do dia;
- mostrar eventos futuros quando os módulos existirem;
- ligar ações rápidas às telas reais;
- remover todos os números fictícios.

**Critério:** cada indicador possui origem identificável e período explícito.

# Fases 9 a 13 — Módulos complementares

## Exames de faixa

1. criar exame com data e progressão de faixa;
2. selecionar atletas elegíveis;
3. associar técnicas e fundamentos;
4. registrar resultados e observações;
5. atualizar histórico de faixa sem apagar histórico anterior.

## Campeonatos

1. cadastrar evento;
2. associar atletas e categorias;
3. registrar posição e resultado;
4. editar resultados após o evento;
5. exibir histórico no perfil do atleta.

## Financeiro

1. definir competência, vencimento, valor e status;
2. gerar ou cadastrar mensalidade;
3. marcar pagamento;
4. listar pendentes e atrasados;
5. filtrar por mês;
6. calcular total recebido e adimplência com período explícito.

## Comunicados

1. cadastrar título e conteúdo;
2. definir status e período de publicação;
3. definir audiência;
4. listar e editar;
5. preparar exibição futura para professores e atletas.

## Configurações e permissões

1. editar perfil do professor;
2. configurar dados da academia;
3. persistir tema claro/escuro;
4. exibir versão do sistema;
5. aplicar matriz de permissões no backend;
6. validar isolamento de turmas e ações administrativas.

# Fase 14 — Qualidade e entrega

## Sessão 14.1 — Consistência

- padronizar respostas de API;
- padronizar mensagens de erro;
- remover dados mockados e `console.log` temporários;
- revisar loading, vazio e erro em cada tela;
- verificar acessibilidade básica dos formulários.

## Sessão 14.2 — Testes

- testar autenticação;
- testar CRUD de cada módulo;
- testar permissões com instrutor e administrador;
- testar relações atleta/turma/presença;
- testar build do frontend;
- testar inicialização pela raiz;
- documentar necessidade de MongoDB e variáveis de ambiente.

## Sessão 14.3 — Publicação

- separar configuração de desenvolvimento e produção;
- remover segredos do repositório;
- definir CORS de produção;
- configurar banco e variáveis na hospedagem;
- publicar frontend e backend conforme arquitetura definida;
- executar smoke test pós-publicação.

## Checklist de encerramento de cada sessão

- [ ] O objetivo da sessão foi concluído.
- [ ] O backend foi validado quando houve alteração de API.
- [ ] O frontend foi validado quando houve alteração de tela.
- [ ] O fluxo principal foi testado manualmente.
- [ ] Loading, vazio e erro foram considerados.
- [ ] Não existem dados fictícios usados como se fossem reais.
- [ ] Permissões foram verificadas no backend.
- [ ] O estado do Git foi conferido.
- [ ] Pendências foram registradas.

