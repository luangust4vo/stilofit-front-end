## assets
Contém arquivos estáticos como imagens, ícones, fontes e qualquer outro tipo de mídia ou recurso que não seja código.

## components
Agrupa todos os componentes reutilizáveis da aplicação, como botões, modais, inputs, cards, etc. Os componentes aqui são geralmente pequenos e focados em uma única funcionalidade visual.

## contexts
Armazena os contextos React criados com createContext e useContext para gerenciamento de estados globais da aplicação, como autenticação, tema, entre outros.

## data
Armazena dados estáticos ou mockados (como jsons usados antes da integração com o backend), como JSONs de teste ou dados usados apenas na fase de desenvolvimento antes da integração com o back-end.

## hooks
Contém hooks personalizados (custom hooks) reutilizáveis para abstrair lógicas complexas ou repetitivas, como manipulação de formulários, chamadas de API, detecção de eventos, etc.

## pages
Agrupa os componentes que representam páginas completas da aplicação, geralmente ligados às rotas. Ex: Home, Login, Dashboard, etc.

## services
Contém funções e configurações relacionadas à comunicação com APIs externas (ex: via axios ou fetch). Aqui ficam as funções de login, busca de dados, envio de formulários, etc.

## styles
Armazena arquivos SCSS ou outros tipos de folhas de estilo globais, variáveis de tema, mixins, etc. Ideal para manter a estilização geral da aplicação centralizada.

## utils
Guarda funções utilitárias e helpers genéricos que não pertencem a nenhum componente ou parte visual específica, como formatadores de data, máscaras de input, validadores, etc.