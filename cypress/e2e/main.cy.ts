/// <reference types="cypress" />

describe('from first launch to create order', () => {
	const user = {
		email: 'ivan.storojenko@gmail.com',
		password: '111111',
	};

	// describe('authorization', () => {
	// 	it('should open login page', () => {
	// 		cy.visit('/login');
	// 		cy.contains('Вход');
	// 	});

	// 	it('successful authorization', () => {
	// 		cy.login(user.email, user.password);
	// 	});

	// 	it('authorization error due to wrong data', () => {
	// 		cy.visit('/login');
	// 		cy.get('[data-testid="email-input"]').type('wrong@email.com');
	// 		cy.get('[data-testid="password-input"]').type('wrongpassword');
	// 		cy.get('[data-testid="submit-button"]').click();
	// 		cy.get('[data-testid="error-message"]').should('be.visible');
	// 	});
	// });

	describe('Place order', () => {
		beforeEach(() => {
			cy.login(user.email, user.password);
		});

		it('should drag and drop bun', () => {
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
			cy.contains('p', 'Ваш заказ начали готовить').should('be.visible');
		});
	});
});
