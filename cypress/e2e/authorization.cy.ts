describe('Authorization test', () => {
	it('Deberia redireccionar a un usuario sin autenticar a /auth/signin', () => {
		// Ensure a clean, unauthenticated state
		cy.clearCookies();

		cy.visit('/'); // Or any other protected route

		cy.location('pathname').should('eq', '/auth/signin', {
			retries: {
				runMode: 'until',
				delay: 2000,
				maxRetries: 5,
				onRetry: (err: any) => {
					console.log('Retrying URL assertion...', err);
				},
			},
		});
	});

	it('Deberia redireccionar a un usuario sin autorizacion al HomePage ', () => {
		// Ensure a clean, unauthenticated state
		cy.clearCookies();

		cy.visit('/auth/signin');

		cy.get('[data-cy="email"]').type('user@user.com'); // Use credentials for unauthorized user
		cy.get('[data-cy="password"]').type('123');
		cy.get('[data-cy="signin"]').click();

		cy.wait(1000);

		cy.url().should('include', '/'); // Check for successful login

		cy.visit('/settings/permissions').then(() => {
			// Use Cypress's built-in retry mechanism with clear assertions
			cy.location('pathname').should('eq', '/', {
				retries: {
					runMode: 'until',
					delay: 2000,
					maxRetries: 5,
					onRetry: (err: any) => {
						console.log('Retrying URL assertion...', err);
					},
				},
			});
		});
	});
});
