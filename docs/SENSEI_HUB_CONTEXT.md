# Sensei Hub — Contexto e visão do produto

> Documento de referência para pessoas, agentes, skills e avaliações futuras do sistema.
>
> Este arquivo descreve a visão funcional do produto. Uma funcionalidade citada aqui não deve ser considerada implementada sem confirmação no código, na interface ou em uma decisão registrada posteriormente.

## 1. Visão geral

O Sensei Hub é um sistema de gerenciamento para academias e dojos de artes marciais. A aplicação deve centralizar informações operacionais, pedagógicas, esportivas e financeiras da academia, reduzindo controles manuais e oferecendo aos professores uma visão clara da rotina do dojo.

O sistema está em desenvolvimento e pode possuir protótipos ou versões em ambientes como Vercel/V0 e Lovable. Este documento representa a visão consolidada do produto, independentemente da tecnologia ou do ambiente em que cada parte esteja publicada.

## 2. Objetivos do produto

- Centralizar o cadastro e o acompanhamento de atletas, professores e turmas.
- Facilitar o registro de presença e o acompanhamento da frequência.
- Organizar treinos, técnicas e rotinas de preparação.
- Apoiar exames de faixa, fundamentos e progressão técnica.
- Registrar campeonatos e resultados dos atletas.
- Controlar mensalidades, pagamentos e inadimplência.
- Oferecer um dashboard com informações relevantes para a operação diária.
- Evoluir futuramente para permitir acesso controlado dos próprios atletas.

## 3. Usuários e escopo de acesso

### 3.1 Escopo inicial

No momento, os usuários do sistema são professores. A intenção inicial é que todos os professores tenham acesso amplo às funcionalidades necessárias para operar a academia.

Enquanto o controle detalhado de permissões não estiver implementado, não se deve presumir que as regras futuras abaixo já estejam aplicadas.

### 3.2 Permissões planejadas

Haverá pelo menos dois níveis de professor:

- **Professor administrador:** possui responsabilidades administrativas adicionais.
- **Professor/instrutor:** atua no ensino e na operação das turmas às quais está relacionado.

Diretrizes futuras de permissão:

| Ação | Professor/instrutor | Professor administrador |
|---|---:|---:|
| Criar atletas | Sim | Sim |
| Criar turmas | Sim | Sim |
| Criar professores | A definir | A definir |
| Remover atletas | Não | Sim |
| Remover turmas | Não | Sim |
| Remover professores | Não | Sim |
| Consultar turmas sem relação | Não, futuramente | Conforme regra administrativa |
| Editar dados operacionais | Sim, conforme escopo | Sim |

Regra importante de isolamento futuro: um professor de uma turma não deve visualizar turmas das quais não participa, salvo quando possuir uma permissão administrativa que autorize essa visualização. Essa regra deve ser aplicada no backend, e não apenas escondida na interface.

### 3.3 Usuários futuros

Em uma etapa posterior, alunos/atletas poderão acessar o sistema para consultar informações próprias, como presença, eventos, treinos, exames e comunicados. Esse acesso deve ser limitado aos dados do próprio atleta e não faz parte do escopo inicial.

## 4. Módulos e páginas

### 4.1 Dashboard

O dashboard é a visão inicial da operação do dojo. Deve apresentar informações rápidas, ações frequentes e links para os módulos detalhados.

Indicadores e conteúdos planejados:

- total de atletas ativos;
- mensalidades pagas ou em dia;
- turmas ativas;
- presença média em um período definido;
- treinos do dia, incluindo múltiplas turmas quando aplicável;
- próximos eventos ainda não realizados, preferencialmente até o fim do ano corrente;
- histórico recente de promoções de faixa;
- próximos eventos relevantes;
- ações rápidas para cadastrar atleta, registrar presença, agendar exame de faixa e cadastrar campeonato.

O período da presença média deve ser definido de forma consistente. Uma opção inicial é considerar os treinos realizados no mês anterior ou o período do primeiro dia do mês anterior até a data atual. A decisão final deve ser documentada quando a regra for implementada.

### 4.2 Atletas

Página para listar, cadastrar e consultar atletas.

Informações e filtros planejados:

- nome do atleta;
- e-mail;
- faixa atual;
- idade;
- turmas relacionadas;
- status, como ativo ou inativo;
- filtros por faixa, idade, turma e status;
- ação para visualizar o perfil detalhado do atleta;
- ação para cadastrar um novo atleta.

O perfil do atleta poderá futuramente reunir presença, pagamentos, turmas, histórico de faixas, exames e resultados de campeonatos.

### 4.3 Turmas

Página para cadastrar e visualizar turmas, preferencialmente em cards ou uma apresentação equivalente que facilite a leitura rápida.

Cada turma pode apresentar:

- nome;
- status;
- descrição;
- professor responsável;
- dias da semana;
- horário de início e término;
- quantidade atual de alunos;
- limite de alunos;
- nível, como iniciante ou avançado;
- faixa etária ou idade mínima;
- outros marcadores relevantes.

Todos os professores poderão criar turmas no escopo inicial planejado. A remoção de turmas deverá ser restrita ao professor administrador quando o permissionamento for implementado.

### 4.4 Presença

Página para registrar presença rapidamente e consultar o histórico.

Fluxo principal planejado:

1. selecionar a turma e o treino/data;
2. listar os atletas vinculados à turma;
3. marcar cada atleta como presente ou ausente;
4. salvar o registro;
5. consultar ou corrigir registros anteriores conforme a permissão do usuário.

O histórico de presença deve permitir análises futuras, incluindo média de frequência por atleta, turma e período.

### 4.5 Treinos e biblioteca de técnicas

O módulo de treinos deve permitir cadastrar rotinas de treinamento, por exemplo:

- treino básico;
- treino técnico;
- preparação para competição;
- treino específico por objetivo ou nível.

Uma rotina deve poder ser estruturada por tempo e blocos, permitindo organizar aquecimento, preparação física, técnicas, exercícios, rounds e encerramento.

A biblioteca de técnicas deve permitir cadastrar:

- nome da técnica;
- tipo ou classificação;
- categoria;
- descrição;
- link de vídeo, como YouTube;
- outras informações pedagógicas que sejam definidas posteriormente.

As técnicas cadastradas devem poder ser reutilizadas em rotinas de treino e exames de faixa.

### 4.6 Exames de faixa

Página para planejar e acompanhar exames de graduação.

O fluxo poderá incluir:

- data do exame;
- faixa atual e faixa pretendida;
- seleção dos atletas participantes;
- técnicas exigidas;
- fundamentos avaliados;
- perguntas teóricas ou práticas;
- resultado e observações;
- histórico de progressão do atleta.

Exemplo: exame para progressão da faixa branca para a faixa cinza, com atletas, técnicas e fundamentos específicos associados ao evento.

### 4.7 Campeonatos

Página para cadastrar campeonatos e acompanhar a participação dos atletas.

Informações planejadas:

- nome do campeonato;
- data e local;
- organização ou categoria;
- atletas participantes;
- modalidade, categoria ou divisão;
- resultados;
- posição obtida;
- observações.

O campeonato deve poder ser editado posteriormente para inserir os resultados após a competição.

### 4.8 Financeiro

Página para controle de mensalidades e pagamentos.

O painel financeiro deve permitir visualizar, especialmente em relação ao mês atual:

- total recebido;
- valores pendentes;
- valores atrasados;
- percentual de adimplência;
- lista de atletas e status do pagamento;
- histórico filtrável por mês ou com todos os meses;
- ação para marcar uma mensalidade como paga ou não paga.

As regras de vencimento, competência, descontos, multas, formas de pagamento e valores devem ser definidas antes de implementar cálculos mais completos.

### 4.9 Comunicados

Página para cadastrar comunicados da academia. A forma final de exibição ainda será definida, mas o módulo deve preservar a possibilidade de publicar informações para públicos específicos no futuro, como todos os professores, uma turma ou os atletas.

### 4.10 Professores

Página para cadastrar e consultar professores, com informações como:

- nome;
- e-mail;
- telefone;
- faixa;
- tipo de usuário, como administrador ou instrutor;
- turmas relacionadas;
- status de acesso.

A remoção de professores deve ser uma ação exclusiva do professor administrador quando as permissões forem implementadas.

### 4.11 Configurações

Cada professor deve poder consultar e alterar suas informações permitidas, como nome, e-mail e faixa.

Também devem existir configurações da aplicação e da academia, incluindo:

- tema claro ou escuro;
- versão do sistema;
- informações do dojo/academia;
- dados institucionais que possam ser exibidos em outras áreas.

Alterações de configurações sensíveis ou institucionais podem exigir permissão administrativa.

## 5. Entidades principais

As entidades esperadas no domínio incluem:

- Professor;
- Atleta;
- Turma;
- Presença;
- Faixa;
- Técnica;
- Rotina de treino;
- Exame de faixa;
- Fundamento/pergunta;
- Campeonato;
- Resultado de campeonato;
- Mensalidade/pagamento;
- Comunicado;
- Configuração da academia.

As relações, campos obrigatórios e regras de integridade devem ser refinados conforme cada módulo for implementado.

## 6. Princípios de implementação

- A interface deve refletir o domínio de uma academia de artes marciais, mantendo linguagem clara para professores.
- Regras de negócio e permissões devem ser protegidas no backend; a interface não é uma camada de segurança.
- Funcionalidades planejadas não devem ser apresentadas como concluídas sem evidência de implementação.
- Filtros, datas e indicadores devem deixar explícito o período considerado.
- Exclusões devem ser tratadas com cuidado; quando possível, preferir inativação ou arquivamento para preservar histórico.
- O sistema deve manter histórico suficiente para presença, pagamentos, graduações e resultados esportivos.
- A experiência deve funcionar bem tanto para ações rápidas durante a rotina quanto para consultas detalhadas.

## 7. Estado atual e avaliação de progresso

Este documento é uma visão de produto, não um inventário automático do código. Ao avaliar uma implementação, classificar cada item como:

- **Implementado:** existe no código e pode ser utilizado de forma coerente.
- **Parcial:** existe uma parte do fluxo, mas faltam regras, telas, validações ou integração.
- **Protótipo:** há uma representação visual ou estrutural, sem funcionamento completo.
- **Planejado:** descrito neste documento, mas ainda sem evidência de implementação.
- **Contraditório:** o comportamento atual diverge da regra ou objetivo documentado.
- **Indefinido:** depende de uma decisão de produto ainda não tomada.

Ao identificar divergências, registrar:

1. o módulo afetado;
2. o comportamento encontrado;
3. a expectativa descrita neste documento;
4. o impacto;
5. uma sugestão de decisão ou próximo passo.

## 8. Decisões ainda pendentes

- Definir o período oficial da presença média do dashboard.
- Definir quais campos são obrigatórios em cada cadastro.
- Definir regras completas de mensalidade, vencimento e inadimplência.
- Definir o modelo detalhado de permissões e o escopo administrativo.
- Definir se professores podem visualizar dados financeiros de toda a academia ou apenas de turmas relacionadas.
- Definir a forma de publicação e audiência dos comunicados.
- Definir o escopo do futuro acesso dos atletas.
- Definir políticas de exclusão, inativação e retenção de histórico.
- Definir como ambientes Vercel/V0 e Lovable se relacionam com o código principal.

## 9. Como usar este documento

Agentes e colaboradores devem ler este arquivo antes de propor ou implementar mudanças relevantes no Sensei Hub. Ao trabalhar em um módulo:

1. localizar a seção correspondente;
2. verificar se a mudança atende aos objetivos e às regras de acesso;
3. distinguir claramente o que é requisito atual, planejamento futuro ou decisão pendente;
4. atualizar este documento quando uma decisão de produto for tomada;
5. evitar remover contexto existente sem registrar a mudança.

Quando houver conflito entre este documento e uma decisão mais recente registrada pelo responsável pelo projeto, a decisão mais recente deve prevalecer e este arquivo deve ser atualizado para refletir o novo entendimento.

