/// <reference types="cypress" />

describe('open ingredient details modal and then close modal', () => {
	it('should open ingredient details modal and then close modal', () => {
		cy.log('open ingredient details modal');
		cy.visit('/');
		cy.get('[data-testid="home-title"]').should('be.visible');
		cy.get('[data-testid="ingredient-bun"]').first().click();
		cy.get('[data-testid="title-ingredient-details"]').should('be.visible');

		cy.log('ingredient details shown');
		cy.get('[data-testid="modal"]').contains('h3', 'булка');
		cy.get('[data-testid="calories"]').contains('span', /^\d+$/);

		cy.log('modal closes');
		cy.get('[data-testid="modal-close"]').click();
		cy.get('[data-testid="modal"]').should('not.exist');
	});
});
