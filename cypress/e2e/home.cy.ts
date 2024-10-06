describe('HomeComponent', () => {
  const baseUrl = 'http://localhost:4222';

  beforeEach(() => {
    cy.visit(baseUrl); // Visita a URL definida antes de cada teste
  });

  it('should load the app', () => {
    cy.contains('Welcome!');
  });

  it('should display the title', () => {
    cy.get('p').should('contain', 'Host A');
  });

});

describe('AppComponent', () => {
  const baseUrl = 'http://localhost:4222';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('should display the application title', () => {
    cy.get('.navbar span').should('contain', 'App Books'); // Verifica se o título está presente
  });

  it('should have navigation links', () => {
    cy.get('a').should('have.length', 2); // Verifica se existem dois links de navegação
    cy.get('a').contains('Home').should('be.visible'); // Verifica se o link 'Home' está visível
    cy.get('a').contains('Login').should('be.visible'); // Verifica se o link 'Login' está visível
  });

  it('should navigate to the home page when the Home link is clicked', () => {
    cy.get('a').contains('Home').click(); // Clica no link 'Home'
    cy.url().should('include', '/'); // Verifica se a URL inclui a página inicial
  });

  it('should navigate to the login page when the Login link is clicked', () => {
    cy.get('a').contains('Login').click(); // Clica no link 'Login'
    cy.url().should('include', '/login'); // Verifica se a URL inclui a página de login
  });

});
