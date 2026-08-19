/// <reference types="cypress" />

describe('Fonctionnalité de recherche', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('welcomebanner_status', 'dismiss');
        win.localStorage.setItem('cookieconsent_status', 'dismiss');
      }
    });

    cy.get('body').then(($body) => {
      if ($body.find('.cdk-overlay-backdrop').length > 0) {
        cy.get('body').type('{esc}');
      }
    });
  });

  it('devrait rechercher et afficher un produit spécifique dans le catalogue', () => {
    // Clic pour ouvrir la barre de recherche
    cy.get('mat-icon').contains('search').click({ force: true });

    // Saisie forcée en cas de délai d'animation CSS
    cy.get('#searchQuery input')
      .should('exist')
      .type('Apple{enter}', { force: true });

    cy.url().should('include', '/#/search?q=Apple');
    cy.get('.mat-card').contains('Apple Juice').should('be.visible');
  });
});