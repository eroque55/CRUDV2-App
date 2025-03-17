import CreateCustomer from "../support/listing/createCustomer";
import { customersToCreate } from "../fixtures/customers.json";

describe("Happy create customer", () => {
   beforeEach(() => {
      cy.visit("/");
      cy.intercept("GET", "http://localhost:8000/customers").as("getCustomers");
      cy.intercept("POST", "http://localhost:8000/customers").as(
         "succesCreateCustomer"
      );
   });

   it("Create a customer and verify if he was added", () => {
      let lastCustomers: any[] = [];
      cy.wait("@getCustomers").then(({ response }) => {
         lastCustomers = response?.body;
      });

      cy.get(".index-styles__StyledAddButton-sc-2bd0f11a-0").click();
      CreateCustomer.fillAllData(customersToCreate[1]);

      cy.get(".modal-styles__StyledDialog-sc-c19ee1d0-1").should("be.visible");
      cy.get(".index-styles__StyledModalFooterButton-sc-30a424b-1").click();

      cy.wait("@getCustomers").then(({ response }) => {
         const newCustomers = response?.body;

         expect(newCustomers.length).to.be.greaterThan(
            lastCustomers.length,
            "A lista de clientes não foi atualizada corretamente."
         );

         lastCustomers = newCustomers;
      });
   });
});
