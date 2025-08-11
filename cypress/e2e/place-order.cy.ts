/// <reference types="cypress" />

describe('authorize and place order', () => {
	const user = {
		email: 'ivan.storojenko@gmail.com',
		password: '111111',
	};

	it('should drag and drop bun', () => {
		cy.login(user.email, user.password);
		cy.get('[data-testid="home-title"]').should('be.visible');

		cy.get('[data-testid="ingredient-bun"]')
			.first()
			.trigger('mousedown', { which: 1 })
			.wait(100)
			.trigger('dragstart');

		cy.get('[data-testid="drop-zone"]')
			.trigger('dragover', { force: true })
			.wait(100)
			.trigger('drop', { force: true })
			.wait(100)
			.trigger('mouseup');

		cy.get('[data-testid="ingredient-main"]')
			.first()
			.trigger('mousedown', { which: 1 })
			.wait(100)
			.trigger('dragstart');

		cy.get('[data-testid="drop-zone"]')
			.trigger('dragover', { force: true })
			.wait(100)
			.trigger('drop', { force: true })
			.wait(100)
			.trigger('mouseup');

		cy.get('[data-testid="place-order-btn"]').click();

		cy.get('[data-testid="modal"]').should('be.visible');
		cy.wait(16000);
		cy.get('[data-testid="title-order-number"]')
			.contains(/^\d+$/)
			.should('be.visible');
	});
});
