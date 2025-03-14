import EditCustomer from "../support/details/editCustomer";
import { cardToCreate } from "../fixtures/customers.json";

describe("Happy create card", () => {
   beforeEach(() => {
      cy.visit("/customer/1");
      cy.intercept("GET", "http://localhost:8000/customers/*", (req) => {
         delete req.headers["if-none-match"];
      }).as("getCustomer");
      cy.intercept("POST", "http://localhost:8000/cards").as("createCard");
   });

   it("Create a card and verify", () => {
      cy.wait("@getCustomer").then(({ response }) => {
         const lastCards = response?.body.cards;

         cy.get(
            ".page-styles__TabsContainer-sc-ecd5908a-5 > :nth-child(3)"
         ).click();
         cy.get(".index-styles__StyledAddButton-sc-2bd0f11a-0").click();

         EditCustomer.submitCard(cardToCreate);
         // cy.wait("@createCard").then((response) => {
         //    const newCard = response.request.body;
         //    expect(newCard).to.deep.equal(cardToCreate);
         // });

         cy.wait("@getCustomer").then(({ response }) => {
            const newCards = response?.body.cards;
            expect(newCards.length).to.be.greaterThan(lastCards.length);
         });
      });
   });
});
