describe("The home page", () => {
   it("successfully loads", () => {
      cy.visit("/");
   });
});

describe("Cadastrar", () => {
   it("Botao clicado com sucesso", () => {
      cy.visit("/");
      cy.get(".index-styles__StyledAddButton-sc-2bd0f11a-0").click();
      cy.get(":nth-child(1) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "Eduardo Roque Serapilha de Sousa"
      );
      cy.get(":nth-child(2) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "2002-02-11"
      );
      cy.get(
         ":nth-child(3) > .index-styles__StyledInputMask-sc-bb82b5be-2"
      ).type("51197866850");
      cy.get(
         ":nth-child(4) > .index-styles__StyledSelect-sc-bb82b5be-3"
      ).select(0);
      cy.get(":nth-child(5) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "eduardo.sousa17@fatec.sp.gov.br"
      );
      cy.get(":nth-child(6) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "Aa12345@"
      );
      cy.get(":nth-child(7) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "Aa12345@"
      );
      cy.get(
         ":nth-child(9) > .index-styles__StyledInputMask-sc-bb82b5be-2"
      ).type("11972775377");
      cy.get(
         ":nth-child(10) > .index-styles__StyledSelect-sc-bb82b5be-3"
      ).select(0);
      cy.get(".bgjfki").click();
      cy.get(":nth-child(1) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "Endereço de cobrança"
      );
      cy.get(".index-styles__StyledInputMask-sc-bb82b5be-2").type("08790550");
      cy.get(
         ":nth-child(3) > .index-styles__StyledSelect-sc-bb82b5be-3"
      ).select(0);
      cy.get(
         ":nth-child(4) > .index-styles__StyledSelect-sc-bb82b5be-3"
      ).select(0);
      cy.get(":nth-child(5) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "Rua Jean Dornauf"
      );
      cy.get(":nth-child(6) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "36"
      );
      cy.get(":nth-child(7) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "Vila Nova Socorro"
      );
      cy.get(
         ":nth-child(8) > .index-styles__StyledSelect-sc-bb82b5be-3"
      ).select(1);
      cy.get(
         ":nth-child(9) > .index-styles__StyledSelect-sc-bb82b5be-3"
      ).select(1);
      cy.get(
         ":nth-child(10) > .index-styles__StyledSelect-sc-bb82b5be-3"
      ).select(1);
      cy.get(":nth-child(11) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "Teste"
      );
      cy.get(".bgjfki").click();
      cy.get(":nth-child(1) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "Endereço de entrega"
      );
      cy.get(".index-styles__StyledInputMask-sc-bb82b5be-2").type("08790550");
      cy.get(
         ":nth-child(3) > .index-styles__StyledSelect-sc-bb82b5be-3"
      ).select(1);
      cy.get(
         ":nth-child(4) > .index-styles__StyledSelect-sc-bb82b5be-3"
      ).select(1);
      cy.get(":nth-child(5) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "Rua Jean Dornauf"
      );
      cy.get(":nth-child(6) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "36"
      );
      cy.get(":nth-child(7) > .index-styles__StyledInput-sc-bb82b5be-1").type(
         "Vila Nova Socorro"
      );
      cy.get(
         ":nth-child(8) > .index-styles__StyledSelect-sc-bb82b5be-3"
      ).select(1);
      cy.get(
         ":nth-child(9) > .index-styles__StyledSelect-sc-bb82b5be-3"
      ).select(1);
      cy.get(
         ":nth-child(10) > .index-styles__StyledSelect-sc-bb82b5be-3"
      ).select(1);
      cy.get(".bgjfki").click();
   });
});
