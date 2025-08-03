/// <reference types="cypress" />

describe('open ingredient details modal and then close modal', () => {
	it('should open ingredient details modal and then close modal', () => {
		cy.log('open ingredient details modal');
		cy.visit('/');
		cy.contains('Соберите бургер');
		cy.get('[data-testid="ingredient-bun"]').first().click();
		cy.contains('Детали ингредиента');

		cy.log('ingredient details shown');
		cy.get('[data-testid="modal"]').contains('h3', 'булка');
		cy.get('[data-testid="calories"]').contains('span', /^\d+$/);

		cy.log('modal closes');
		cy.get('[data-testid="modal-close"]').click();
		cy.get('[data-testid="modal"]').should('not.exist');
	});
});
