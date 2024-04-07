describe('Authentication test', () => {
	it('should login successfully with valid credentials', () => {
		cy.visit('/auth/signin'); // Replace with your login route

		// Find email and password inputs
		cy.get('[data-cy="email"]').type('admin@admin.com');
		cy.get('[data-cy="password"]').type('123');

		// Submit the form
		cy.get('[data-cy="signin"]').click();

		// Assertions after successful login
		cy.url().should('not.include', '/auth/signin'); // Check if URL changes after login
	});
});
