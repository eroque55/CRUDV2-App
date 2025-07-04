import EditCustomer from '../support/details/editCustomer';
import { cardToCreate } from '../fixtures/customers.json';

describe('Happy create card', () => {
  it('Create a card and verify', () => {
    cy.visit('/admin/customers');
    cy.get(
      ':nth-child(2) > .lists-styles__StyledRowBodyActions-sc-f0e62f7e-3 > .index-styles__StyledLink-sc-bfe3845a-0',
    ).click();
    cy.intercept('GET', 'http://localhost:8000/customers/*', req => {
      delete req.headers['if-none-match'];
    }).as('getCustomer');
    cy.intercept('POST', 'http://localhost:8000/cards').as('createCard');

    cy.wait('@getCustomer').then(() => {
      cy.get(
        '.page-styles__TabsContainer-sc-ecd5908a-5 > :nth-child(3)',
      ).click();
      cy.get('.index-styles__StyledAddButton-sc-2bd0f11a-0').click();

      EditCustomer.submitCard(cardToCreate);

      cy.wait('@createCard').then(({ response }) => {
        expect(response?.statusCode).to.eq(200);
      });

      cy.wait('@getCustomer');
    });
  });
});
