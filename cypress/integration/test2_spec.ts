/// <reference types="cypress" />
/* eslint-disable no-undef */
import {
  ERROR_DUPLICATED_NUMBER, ERROR_MISSING_NUMBER, ERROR_NUMBER_RANGE,
} from '../support/constant';

describe('lottoMachine', () => {
  const go = (arr: number[]): Cypress.Chainable<JQuery<any>> => {
    cy.get('.winning-number')
      .each((input, idx) => {
        if (arr[idx] !== 0) {
          cy.wrap(input)
            .clear()
            .type(String(arr[idx]));
        }
      });
    if (arr[6] !== 0) {
      cy.get('.bonus-number')
        .clear()
        .type(String(arr[6]));
    } else {
      cy.get('.bonus-number')
        .clear();
    }
    return cy.get('.open-result-modal-button')
      .click();
  };

  it('do not miss number', () => {
    // const alertMessage: string = '번호를 모두 입력해주십시오.';
    cy.visit('./index.html');

    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('.open-result-modal-button')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR_MISSING_NUMBER);
      });

    go([1, 0, 3, 4, 5, 6, 7])
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR_MISSING_NUMBER);
      });

    go([1, 20, 3, 4, 5, 6, 0])
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR_MISSING_NUMBER);
      });
  });

  it('has number in range 1 ~ 45', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    go([1, 20, 3, 4, 5, 90, 15])
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR_NUMBER_RANGE);
      });

    go([1, 20, 3, 4, -50, 9, 18])
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR_NUMBER_RANGE);
      });
  });

  it('do not have duplicated number', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    go([1, 20, 3, 4, 1, 9, 15])
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR_DUPLICATED_NUMBER);
      });

    go([1, 20, 3, 4, 8, 6, 20])
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR_DUPLICATED_NUMBER);
      });
  });
});
