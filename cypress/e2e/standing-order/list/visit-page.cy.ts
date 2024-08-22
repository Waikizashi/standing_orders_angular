describe('visit SO page', () => {
afterEach(()=>{
  cy.url().should('include', '/standing-orders');
})
  it('should visit main page by empty path', () => {
    cy.visit('/')
  })
  it('should visit main page by SO list path', () => {
    cy.visit('/standing-orders')
  })
})
