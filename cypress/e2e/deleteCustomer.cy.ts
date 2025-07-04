describe('Visit customer details', () => {
  it('Visit customer details', () => {
    cy.visit('/admin/customers');
    cy.intercept('GET', 'http://localhost:8000/customers', req => {
      delete req.headers['if-none-match'];
    }).as('getCustomers');
    cy.intercept('DELETE', 'http://localhost:8000/customers/*').as(
      'deleteCustomer',
    );

    cy.wait('@getCustomers').then(({ response }) => {
      const lastCustomers = response?.body;
      cy.get('.index-styles__StyledTable-sc-843dcd6c-0 > :nth-child(2)').should(
        'be.visible',
      );
      cy.get(
        ':nth-child(2) > .lists-styles__StyledRowBodyActions-sc-f0e62f7e-3 > .index-styles__StyledButton-sc-1f7ec32f-0',
      ).click();
      cy.contains('Tem certeza?').should('be.visible');
      cy.get('.bfPXBo').click();
      cy.wait('@deleteCustomer');
      cy.wait('@getCustomers').then(({ response: resp1 }) => {
        const newCustomers = resp1?.body;
        expect(newCustomers.length).to.be.lessThan(lastCustomers.length);
      });
    });
  });
});
