import EditCustomer from '../support/details/editCustomer';
import { customersToUpdate } from '../fixtures/customers.json';

describe('Edit personal data', () => {
  it('Edit personal data', () => {
    cy.visit('/admin/customers');
    cy.get(
      ':nth-child(2) > .lists-styles__StyledRowBodyActions-sc-f0e62f7e-3 > .index-styles__StyledLink-sc-bfe3845a-0',
    ).click();

    cy.intercept('GET', 'http://localhost:8000/customers/*', req => {
      delete req.headers['if-none-match'];
    }).as('getCustomer');

    cy.intercept('PUT', 'http://localhost:8000/customers/*').as('putCustomer');

    cy.intercept('PUT', 'http://localhost:8000/phones/*').as('putPhone');

    cy.wait('@getCustomer').then(({ response }) => {
      const customer = response?.body;
      cy.get('.index-styles__StyledActionButton-sc-38363f88-0').click();
      EditCustomer.verifyPersonalData(customer);
      EditCustomer.submitPersonalData(customersToUpdate);

      cy.get('.modal-styles__StyledDialog-sc-c19ee1d0-1').should('be.visible');

      cy.wait('@putCustomer').then(({ response: resp1 }) => {
        const updatedCustomer = resp1?.body;
        cy.wait('@putPhone').then(({ response: resp2 }) => {
          const updatedPhone = resp2?.body;
          updatedCustomer.phone = updatedPhone;
          updatedCustomer.addresses = customer.addresses;
          updatedCustomer.cards = customer.cards;
        });
      });

      cy.contains('Sucesso!');

      cy.get(
        '#\\31  > .modal-styles__StyledDialog-sc-c19ee1d0-1 > .index-styles__StyledModalFooter-sc-30a424b-0 > .index-styles__StyledModalFooterButton-sc-30a424b-1',
      ).click();
      cy.get('.modal-styles__StyledDialog-sc-c19ee1d0-1').should(
        'not.be.visible',
      );
    });
  });
});
