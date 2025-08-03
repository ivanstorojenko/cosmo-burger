/// <reference types="cypress" />

describe('authorization', () => {
	const user = {
		email: 'ivan.storojenko@gmail.com',
		password: '111111',
	};

	it('successful authorization', () => {
		cy.login(user.email, user.password);
		cy.contains('h1', 'Соберите бургер').should('be.visible');
	});

	it('authorization error due to wrong data', () => {
		cy.visit('/login');
		cy.get('[data-testid="email-input"]').type('wrong@email.com');
		cy.get('[data-testid="password-input"]').type('wrongpassword');
		cy.get('[data-testid="submit-button"]').click();
		cy.get('[data-testid="error-message"]').should('be.visible');
	});
});
