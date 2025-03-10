import EditCustomer from "../support/details/editCustomer";
import { addressToUpdate } from "../fixtures/customers.json";

describe("Edit address", () => {
   it("Edit address", () => {
      cy.visit("/customer/1");

      cy.intercept("GET", "http://localhost:8000/customers/*", (req) => {
         delete req.headers["if-none-match"];
      }).as("getCustomer");

      cy.intercept("PUT", "http://localhost:8000/addresses/*").as("putAddress");

      cy.wait("@getCustomer").then(({ response }) => {
         const address = response?.body.addresses[0];

         cy.get(
            ".page-styles__TabsContainer-sc-6d42649-5 > :nth-child(2)"
         ).click();
         cy.get(
            ":nth-child(1) > .index-styles__ButtonsContainer-sc-882e22e-0 > :nth-child(2)"
         ).click();

         cy.wait(1000);

         EditCustomer.verifyAddress(address);
         EditCustomer.updateAddress(addressToUpdate);

         cy.wait("@putAddress");
      });
   });
});
