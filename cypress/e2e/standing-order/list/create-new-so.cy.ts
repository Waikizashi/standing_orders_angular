describe('create new so', () => {
  it('go to main page', () => {
    cy.visit('/')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('fill form with valid data', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.mx-2 > .mdc-button__label').click();
    cy.get('#mat-input-0').clear('n');
    cy.get('#mat-input-0').type('name');
    cy.get('.mat-mdc-form-field.ng-tns-c19-1 > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').click();
    cy.get('#mat-input-1').clear();
    cy.get('#mat-input-1').type('3500');
    cy.get('mat-label.ng-tns-c19-2').click();
    cy.get('#mat-input-2').clear('S');
    cy.get('#mat-input-2').type('SK9999999999999999999999');
    cy.get('mat-label.ng-tns-c19-3').click();
    cy.get('#mat-input-3').clear('1');
    cy.get('#mat-input-3').type('123456');
    cy.get('mat-label.ng-tns-c19-4').click();
    cy.get('#mat-input-4').clear('1');
    cy.get('#mat-input-4').type('1234');
    cy.get('.align-items-baseline > .mat-mdc-form-field > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').click();
    cy.get('.flex-shrink-0 > .mdc-button__label').click();
    cy.get('[ng-reflect-dialog-result="0058"] > .cdk-column-description > .m-0').click();
    cy.get('#mat-input-6').click();
    cy.get('#mat-select-value-1 > .mat-mdc-select-placeholder').click();
    cy.get('#mat-option-1 > .mdc-list-item__primary-text').click();
    cy.get('mat-label.ng-tns-c19-10').click();
    cy.get('#mat-option-6').click();
    cy.get('.mdc-icon-button > .mat-mdc-button-touch-target').click();
    cy.get(':nth-child(6) > [data-mat-col="3"] > .mat-calendar-body-cell > .mat-calendar-body-cell-content').click();
    cy.get(':nth-child(6) > [data-mat-col="3"] > .mat-calendar-body-cell > .mat-calendar-body-cell-content').click();
    cy.get('.mat-accent > .mdc-button__label').click();
    cy.get('#mat-input-8').clear();
    cy.get('#mat-input-8').type('1234');
    cy.get('.mat-mdc-dialog-actions > .mat-accent > .mdc-button__label').click();
    /* ==== End Cypress Studio ==== */
  });
})
