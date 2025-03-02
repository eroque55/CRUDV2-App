import CreateCustomer from "../support/listing/createCustomer";
import { customers } from "../fixtures/customers.json";

describe("Happy create customer", () => {
   beforeEach(() => {
      cy.visit("/");
      cy.intercept("GET", "http://localhost:8000/customers").as("getCustomers");
      cy.intercept("POST", "http://localhost:8000/customers").as(
         "succesCreateCustomer"
      );
   });

   it("Create 5 customers and verify if they were added", () => {
      let lastCustomers: any[] = [];
      cy.wait("@getCustomers").then(({ response }) => {
         lastCustomers = response?.body;
      });

      customers.forEach((customer: any, index: number) => {
         cy.get(".index-styles__StyledAddButton-sc-2bd0f11a-0").click();
         CreateCustomer.fillAllData(customer);

         cy.wait("@succesCreateCustomer").should(({ request }) => {
            expect(request.body).to.deep.equal(customer);
         });

         cy.get(".modal-styles__StyledDialog-sc-c19ee1d0-1").should(
            "be.visible"
         );
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
});
