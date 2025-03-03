import EditCustomer from "../support/details/editCustomer";
import { customersToUpdate } from "../fixtures/customers.json";

describe("Edit personal data", () => {
   it("Edit personal data", () => {
      cy.visit("/customer/1");

      cy.intercept("GET", "http://localhost:8000/customers/*", (req) => {
         delete req.headers["if-none-match"];
      }).as("getCustomer");

      cy.intercept("PUT", "http://localhost:8000/customers/*").as(
         "putCustomer"
      );

      cy.intercept("PUT", "http://localhost:8000/phones/*").as("putPhone");

      cy.wait("@getCustomer").then(({ response }) => {
         const customer = response?.body;
         cy.get(".index-styles__StyledActionButton-sc-38363f88-0").click();
         EditCustomer.verifyPersonalData(customer);
         EditCustomer.submitPersonalData(customersToUpdate);

         cy.get(".modal-styles__StyledDialog-sc-c19ee1d0-1").should(
            "be.visible"
         );

         cy.wait("@putCustomer").then(({ response }) => {
            const updatedCustomer = response?.body;
            cy.wait("@putPhone").then(({ response }) => {
               const updatedPhone = response?.body;
               updatedCustomer.phones = [updatedPhone];
               updatedCustomer.addresses = customer.addresses;
               updatedCustomer.cards = customer.cards;
            });
            cy.wait("@getCustomer").then(({ response }) => {
               const newCustomer = response?.body;
               expect(newCustomer).to.deep.equal(updatedCustomer);
            });
         });

         cy.contains("Sucesso!");

         cy.get(".index-styles__StyledModalFooterButton-sc-30a424b-1").click();
         cy.get(".modal-styles__StyledDialog-sc-c19ee1d0-1").should(
            "not.be.visible"
         );
      });
   });
});
