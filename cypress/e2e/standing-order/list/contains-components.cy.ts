describe('SO list template', () => {
  beforeEach(()=>{
    cy.visit('/standing-orders');
  })
  it('Page contains toolbars', () => {
    cy.get(".mat-toolbar").should('have.length', 4);
  })
  it('Page contains table', () => {
    cy.get(".mat-mdc-table").should('have.length', 1);
  })
  it('Page contains at least one button', () => {
    cy.get(".mat-mdc-raised-button").should('have.length.at.least', 1);
  })
})
