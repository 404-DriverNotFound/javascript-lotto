/// <reference types="cypress" />
describe('lotto', () => {
  it('basic cost input', () => {
    cy.visit('./index.html');
    cy.get('.lotto-input')
      .type('1111');
    cy.get('.lotto-input button')
      .click();
    cy.get('.total')
      .should('have.text', '총 1 개를 구매하였습니다.');
    cy.get('.tickets')
      .find('span')
      .should('have.length', 1);
    cy.get('.balls')
      .should('be.hidden');
    cy.get('.lotto-purchase')
      .find('.toggle-button')
      .click();
    cy.get('.balls')
      .should('not.be.hidden');
    cy.get('.tickets')
      .should('be.hidden');
  });
});
