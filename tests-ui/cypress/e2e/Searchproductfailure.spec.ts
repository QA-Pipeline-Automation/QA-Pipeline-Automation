describe('Fonctionnalité de recherche - cas échec', () => {

    /**
     * Ce test est VOLONTAIREMENT conçu pour échouer.
     * Objectif : valider que le pipeline (Cypress + Mochawesome + futur parsing n8n)
     * détecte correctement un échec, et pas seulement les cas de succès.
     *
     * Scénario : on recherche "Apple" mais on vérifie la présence d'un produit
     * qui n'existe pas dans le catalogue ("Unicorn Juice"), ce qui doit échouer.
     */
    it('devrait échouer car le produit recherché n\'existe pas dans le catalogue', () => {
        const testEmail = `user_${Date.now()}@test.com`;
        const testPassword = 'Password123!';

        cy.intercept('GET', '**/rest/products/search*').as('searchProducts');

        // Inscription via l'API
        cy.request({
            method: 'POST',
            url: `${Cypress.config('baseUrl')}/api/Users`,
            body: {
                email: testEmail,
                password: testPassword,
                passwordRepeat: testPassword,
                securityQuestion: {
                    id: 1,
                    name: "Your eldest sibling's middle name?",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                securityAnswer: 'test'
            }
        });

        // Connexion API directe
        cy.request({
            method: 'POST',
            url: `${Cypress.config('baseUrl')}/rest/user/login`,
            body: {
                email: testEmail,
                password: testPassword
            }
        }).then((response) => {
            const token = response.body.authentication.token;

            cy.visit('#/search', {
                onBeforeLoad(win) {
                    win.localStorage.setItem('token', token);
                    win.localStorage.setItem('welcomebanner_status', 'dismiss');
                    win.localStorage.setItem('cookieconsent_status', 'dismiss');
                }
            });
        });

        cy.wait('@searchProducts', { timeout: 15000 });

        cy.get('.close-dialog, [aria-label="Close Welcome Banner"]', { timeout: 15000 })
            .first()
            .click({ force: true });

        cy.get('mat-dialog-container', { timeout: 10000 }).should('not.exist');

        cy.get('body').then(($body) => {
            if ($body.find('.cdk-overlay-backdrop').length > 0) {
                cy.get('.cdk-overlay-backdrop').click({ force: true });
            }
        });

        cy.get('mat-icon').contains('search').click({ force: true });
        cy.get('#searchQuery input')
            .should('exist')
            .type('Apple{enter}', { force: true });

        cy.url().should('include', '/#/search?q=Apple');

        cy.get('.mat-card', { timeout: 10000 })
            .contains('Unicorn Juice')
            .should('be.visible');
    });

});