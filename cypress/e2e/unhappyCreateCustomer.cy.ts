import createCustomer from "../support/listing/createCustomer";
import { customers } from "../fixtures/customers.json";

describe("Unhappy create customer path", () => {
   beforeEach(() => {
      cy.visit("/");
      cy.get(".index-styles__StyledAddButton-sc-2bd0f11a-0").click();
   });

   it("Try going next without personal data", () => {
      cy.get(".bgjfki").click();
      createCustomer.validatePersonalData();
   });

   it("Try going next without billing address", () => {
      createCustomer.fillPersonalData(customers[0]);
      cy.get(".bgjfki").click();
      cy.get(".bgjfki").click();
      createCustomer.validateAddress();
   });

   it("Try going next without delivery address", () => {
      createCustomer.fillPersonalData(customers[0]);
      cy.get(".bgjfki").click();
      createCustomer.fillBillingAddress(customers[0].addresses[0]);
      cy.get(".bgjfki").click();
      cy.get(".bgjfki").click();
      createCustomer.validateAddress();
   });
});
