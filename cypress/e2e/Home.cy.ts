describe('Home page', function() {
  it('Home page e2e', function() {
    cy.visit('/');

    cy.getTestId('title').should('contain.text', 'count is 0');

    cy.getTestId('increment').click();
    cy.getTestId('title').should('contain.text', 'count is 1');

    cy.getTestId('reduce').click();
    cy.getTestId('title').should('contain.text', 'count is 0');
  });
});