describe("Visit home", () => {
   it("Visit home", () => {
      cy.intercept("GET", "http://localhost:8000/customers").as("getCustomers");
      cy.visit("/");
      cy.wait("@getCustomers");
   });
});
