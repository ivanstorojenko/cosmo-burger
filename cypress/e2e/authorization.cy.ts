/// <reference types="cypress" />

describe('authorization', () => {
	const user = {
		email: 'ivan.storojenko@gmail.com',
		password: '111111',
	};

	it('successful authorization', () => {
		cy.login(user.email, user.password);
		cy.get('[data-testid="home-title"]').should('be.visible');
	});

	it('authorization error due to wrong data', () => {
		cy.login('wrong@email.com', 'wrongpassword');
		cy.get('[data-testid="error-message"]').should('be.visible');
	});
});
