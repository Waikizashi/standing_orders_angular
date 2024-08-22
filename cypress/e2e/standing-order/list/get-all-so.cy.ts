describe('Standing orders test', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/standingOrder', { fixture: 'standing_orders.json' }).as('getStandingOrders')
  });

  it('Should display standing orders', () => {
    cy.visit('/standing-orders');

    cy.wait('@getStandingOrders').its('response.statusCode').should('eq', 200)
    /**
     * checks realisations...
     */
    cy.contains('RENT').should('be.visible');
    cy.contains('INTERNET').should('be.visible');
    cy.contains('BCH').should('be.visible');
  });
});
