describe('Soumission d\'avis produit', () => {

    it('devrait soumettre un avis sur un produit et l\'afficher correctement', () => {
        const testEmail = `user_${Date.now()}@test.com`;
        const testPassword = 'Password123!';

        cy.intercept('GET', '**/rest/products/search*').as('searchProducts');

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

        cy.wait(1000);

        cy.get('[aria-label="Click for more information about the product"]', { timeout: 15000 })
          .should('have.length.greaterThan', 0)
          .first()
          .scrollIntoView()
          .click({ force: true });

        cy.get('mat-dialog-container', { timeout: 15000 }).should('be.visible');
        cy.wait(1000);

        cy.get('mat-dialog-container').then(($dialog) => {
            cy.writeFile('cypress/debug/dialog-content.html', $dialog[0].outerHTML);
        });

        cy.get('body').then(($body) => {
            const $header = $body.find('mat-expansion-panel-header');
            if ($header.length > 0) {
                cy.wrap($header).first().click({ force: true });
                cy.wait(500);
            }
        });

        cy.get('mat-dialog-container').then(($dialog) => {
            cy.writeFile('cypress/debug/dialog-content-after-expand.html', $dialog[0].outerHTML);
        });

        cy.get('mat-dialog-container', { timeout: 10000 }).within(() => {
            cy.get('textarea', { timeout: 10000 }).first().should('exist');
        });
    });

});