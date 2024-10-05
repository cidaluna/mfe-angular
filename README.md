# Micro Frontend Angular (em desenvolvimento)

Mono repositório contendo duas aplicações Front-end Angular 16, gerenciadas pelo Module Federation.
O micro frontend host-app é o orquestrador que atende na porta 4222 e mfe-app é a aplicação remota que expõe componentes no host-app e roda na porta 4333.

## Como rodar o backend

Utilize o comando `cd backend`

Em seguida, o comando `json-server --watch db.json --port 4000` que irá iniciar o JSON Server


## Como rodar a aplicação Angular

Com o comando `ng serve host-app` navegue na URL `http://localhost:4222/` e confira a aplicação host rodando.

Exemplo no terminal:  

![Iniciando Host App](./projects/host-app/src/assets/start-host-app.PNG)

Com o comando `ng serve mfe-app` navegue na URL `http://localhost:4333/` e confira a aplicação mfe rodando.

### Tecnologias

- Angular 16, 
- Angular Material UI,
- Webpack,
- Module Federation,
- Node.js,
- Boostrap,
- Ícones Font Awesome,
- JSON Server,
- Jasmine Karma,
- Cypress

### Documentação

Criando o mono repositório:

`ng new mfe-angular-app --create-application=false`

`cd mfe-angular-app`

Criando as aplicações micro frontends:

`ng g application host-app --routing --no-standalone --style=scss`

`ng g application mfe-app --routing --no-standalone --style=scss`

Instalando o Webpack:

`npm i webpack webpack-cli --save-dev`

Configurando Module Federation:

`npm install @angular-architects/module-federation`

`ng add @angular-architects/module-federation --project host-app --port 4222`

`ng add @angular-architects/module-federation --project mfe-app --port 4333`

Outros comandos:

`npm cache clean --force`

Dependências:

`npm install cypress --save-dev`

`npx cypress open`

### Screenshot

Tela Home com login no Host Application

![Home Host App](./projects/host-app/src/assets/mfe-home-host-app.PNG)


Tela de listar livros do MFE no Host Application

![Books MFE App](./projects/host-app/src/assets/mfe-host-render-books.PNG)
