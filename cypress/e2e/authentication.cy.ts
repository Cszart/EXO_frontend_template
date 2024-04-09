describe('Authentication test', () => {
	it('Prueba de login con credenciales', () => {
		// Go to login page
		cy.visit('/auth/signin');

		// Find email and password inputs
		cy.get('[data-cy="email"]').type('admin@admin.com');
		cy.get('[data-cy="password"]').type('123');

		// Submit the form
		cy.get('[data-cy="signin"]').click();

		// Assertions after successful login
		cy.url().should('include', '/'); // Check if URL changes after login
	});

	it('Login como ADMINISTRADOR y chequeo de opciones para el rol', () => {
		// Go to login page
		cy.visit('/auth/signin');

		// Enter credentials
		cy.get('[data-cy="email"]').type('admin@admin.com');
		cy.get('[data-cy="password"]').type('123');
		cy.get('[data-cy="signin"]').click();

		cy.url().should('include', '/'); // Check for successful login

		// Check for admin-only options
		cy.get('[data-cy="homePage-sidebar-option-misc1"]').should('be.visible');
		cy.get('[data-cy="homePage-sidebar-option-misc2"]').should('be.visible');
		cy.get('[data-cy="homePage-sidebar-option-misc3"]').should('be.visible');
		cy.get('[data-cy="homePage-sidebar-option-misc4"]').should('be.visible');

		// Click admin option and check suboption
		cy.get('[data-cy="homePage-sidebar-option-misc4"]').click();
		cy.get('[data-cy="homePage-sidebar-option-submisc4Admin"]').should(
			'be.visible'
		);
	});

	it('Login como MODERADOR y chequeo de opciones para el rol', () => {
		cy.visit('/auth/signin');

		cy.get('[data-cy="email"]').type('moderator@moderator.com');
		cy.get('[data-cy="password"]').type('123');
		cy.get('[data-cy="signin"]').click();

		cy.url().should('include', '/'); // Check for successful login

		// Check for moderator-specific options
		cy.get('[data-cy="homePage-sidebar-option-misc2"]').should('be.visible');
		cy.get('[data-cy="homePage-sidebar-option-misc3"]').should('be.visible');
		cy.get('[data-cy="homePage-sidebar-option-misc4"]').should('be.visible');

		// Check sub-options within misc4
		cy.get('[data-cy="homePage-sidebar-option-misc4"]').click();
		cy.get('[data-cy="homePage-sidebar-option-submisc4User"]').should(
			'be.visible'
		);
		cy.get('[data-cy="homePage-sidebar-option-submisc4Moderator"]').should(
			'be.visible'
		);
		cy.get('[data-cy="homePage-sidebar-option-submisc4Admin"]').should(
			'not.exist'
		);
	});

	it('Login como USUARIO y chequeo de opciones para el rol', () => {
		cy.visit('/auth/signin');

		cy.get('[data-cy="email"]').type('user@user.com');
		cy.get('[data-cy="password"]').type('123');
		cy.get('[data-cy="signin"]').click();

		cy.url().should('include', '/'); // Check for successful login

		// Check for user-specific options
		cy.get('[data-cy="homePage-sidebar-option-misc3"]').should('be.visible');
		cy.get('[data-cy="homePage-sidebar-option-misc4"]').should('be.visible');

		// Check sub-options within misc4
		cy.get('[data-cy="homePage-sidebar-option-misc4"]').click();
		cy.get('[data-cy="homePage-sidebar-option-submisc4User"]').should(
			'be.visible'
		);
		cy.get('[data-cy="homePage-sidebar-option-submisc4Moderator"]').should(
			'not.exist'
		);
		cy.get('[data-cy="homePage-sidebar-option-submisc4Admin"]').should(
			'not.exist'
		);
	});
});
