import EditCustomer from "../support/details/editCustomer";
import { addressToUpdate } from "../fixtures/customers.json";

describe("Happy create address", () => {
   beforeEach(() => {
      cy.visit("/");
      cy.get(
         ":nth-child(2) > .lists-styles__StyledRowBodyActions-sc-f0e62f7e-3 > .index-styles__StyledLink-sc-bfe3845a-0"
      ).click();
      cy.intercept("GET", "http://localhost:8000/customers/*", (req) => {
         delete req.headers["if-none-match"];
      }).as("getCustomer");
      cy.intercept("POST", "http://localhost:8000/addresses").as(
         "createAddress"
      );
   });

   it("Create a address and verify", () => {
      cy.wait("@getCustomer").then(({ response }) => {
         const lastAdresses = response?.body.addresses;

         cy.get(
            ".page-styles__TabsContainer-sc-ecd5908a-5 > :nth-child(2)"
         ).click();
         cy.get(".index-styles__StyledAddButton-sc-2bd0f11a-0").click();

         EditCustomer.submitAddress(addressToUpdate);
      });
   });
});
