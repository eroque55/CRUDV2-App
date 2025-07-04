import createCustomer from '../cypress/support/listing/createCustomer';
import { customersToCreate } from '../cypress/fixtures/customers.json';

describe('Unhappy create customer path', () => {
  beforeEach(() => {
    cy.visit('/admin/customers');
    cy.get('.index-styles__StyledAddButton-sc-2bd0f11a-0').click();
  });

  it('Try going next without personal data', () => {
    cy.get('.bgjfki').click();
    createCustomer.validatePersonalData();
  });

  it('Try going next without billing address', () => {
    createCustomer.fillPersonalData(customersToCreate[0]);
    cy.get('.bgjfki').click();
    cy.get('.bgjfki').click();
    createCustomer.validateAddress();
  });

  it('Try going next without delivery address', () => {
    createCustomer.fillPersonalData(customersToCreate[0]);
    cy.get('.bgjfki').click();
    createCustomer.fillBillingAddress(customersToCreate[0].addresses[0]);
    cy.get('.bgjfki').click();
    cy.get('.bgjfki').click();
    createCustomer.validateAddress();
  });
});
