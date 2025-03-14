import EditCustomer from "../support/details/editCustomer";
import { addressToUpdate } from "../fixtures/customers.json";

describe("Happy create address", () => {
   beforeEach(() => {
      cy.visit("/customer/1");
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
         cy.wait("@createAddress").then((response) => {
            const newAddress = response.request.body;
            expect(newAddress).to.deep.equal(addressToUpdate);
         });

         cy.wait("@getCustomer").then(({ response }) => {
            const newAdresses = response?.body.addresses;
            expect(newAdresses.length).to.be.greaterThan(lastAdresses.length);
         });
      });
   });
});
