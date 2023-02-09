namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to select DOM element by data-testid attribute.
     * @example cy.getTestId('greeting')
     */
    getTestId(value: string): Chainable<JQuery<HTMLElement>>
  }
}