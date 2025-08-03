/// <reference types="cypress" />

describe('should redirect to initialy requested page after authorization', () => {
	const user = {
		email: 'ivan.storojenko@gmail.com',
		password: '111111',
	};

	it('should redirect to login page while trying to open profile page', () => {
		cy.visit('/profile');
		cy.contains('Вход');
		cy.login(user.email, user.password);
		cy.contains('Профиль');
	});
});
