describe('Gerenciar Editoras', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4222/publishers');
    cy.clearLocalStorage();
  });

  it('Deve adicionar uma editora', () => {
    // Preencher o campo de nome da editora
    cy.get('input[formControlName="name"]').type('Editora OReilly');

    // Marcar checkboxes
    cy.get('mat-checkbox[formControlName="isActive"]').click();
    cy.get('mat-checkbox[formControlName="isPartner"]').click();

    // Clicar no botão de adicionar
    cy.get('button[type="submit"]').contains('Adicionar').click();

    // Verificar se a editora foi adicionada na tabela
    cy.get('table').contains('td', 'Editora OReilly').should('be.visible');
  });

  it('Deve editar uma editora', () => {
    // Adicionar uma editora para edição
    cy.get('input[formControlName="name"]').type('Editora XYZ');
    cy.get('button[type="submit"]').contains('Adicionar').click();

    // Clicar no botão de editar da editora
    cy.get('table').contains('td', 'Editora XYZ').parent('tr').within(() => {
      cy.get('button').contains('Editar').click();
    });

    // Editar o nome da editora
    cy.get('input[formControlName="name"]').clear().type('Editora XYZ Atualizada');

    // Clicar no botão de editar
    cy.get('button[type="submit"]').contains('Editar').click();

    // Verificar se a editora foi atualizada na tabela
    cy.get('table').contains('td', 'Editora XYZ Atualizada').should('be.visible');
  });

  it('Deve excluir uma editora', () => {
    // Adicionar uma editora para exclusão
    cy.get('input[formControlName="name"]').type('Editora Para Deletar');
    cy.get('button[type="submit"]').contains('Adicionar').click();

    // Clicar no botão de excluir da editora
    cy.get('table').contains('td', 'Editora Para Deletar').parent('tr').within(() => {
      cy.get('button').contains('Excluir').click();
    });

    // Verificar se a editora foi removida da tabela
    cy.get('table').contains('td', 'Editora Para Deletar').should('not.exist');
  });

  it('Deve filtrar editoras', () => {
    // Adicionar editoras para o teste de filtro
    cy.get('input[formControlName="name"]').type('Editora Teste Cida');
    cy.get('button[type="submit"]').contains('Adicionar').click();
    cy.get('input[formControlName="name"]').clear().type('Editora Teste Sao Carlos');
    cy.get('button[type="submit"]').contains('Adicionar').click();

    // Filtrar editoras
    cy.get('input[placeholder="Filtrar editoras"]').type('Cida');

    // Verificar se apenas a editora filtrada é exibida
    cy.get('table').contains('td', 'Editora Teste Cida').should('be.visible');
    cy.get('table').contains('td', 'Editora Teste Sao Carlos').should('not.exist');
  });
});
