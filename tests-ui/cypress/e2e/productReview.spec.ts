/// <reference types="cypress" />

describe('Test de gestion des avis produits', () => {
  const userEmail = `reviewuser_${Date.now()}@test.com`;
  const userPassword = 'Password123!';

  beforeEach(() => {
    // 1. Création de l'utilisateur dédié
    cy.request('POST', 'http://localhost:3000/api/Users', {
      email: userEmail,
      password: userPassword,
      passwordRepeat: userPassword,
      securityQuestion: {
        id: 1,
        question: "Your eldest sibling's middle name?",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z"
      },
      securityAnswer: "Test"
    }).then(() => {
      // 2. Connexion avec la commande personnalisée
      cy.login({ email: userEmail, password: userPassword });
    });
  });

  it('devrait soumettre un avis sur un produit et l\'afficher correctement', () => {
    const reviewText = `Très bon produit ! Test automatisé #${Date.now()}`;

    cy.visit('/', {
      onBeforeVisit(win) {
        win.localStorage.setItem('welcomebanner_status', 'dismiss');
        win.localStorage.setItem('cookieconsent_status', 'dismiss');
      }
    });

    // Interception de la création d'avis
    cy.intercept('PUT', '**/rest/products/*/reviews').as('postReview');

    // Ouverture de la modale du premier produit
    cy.get('mat-card.mat-card').first().click();

    // Saisie directe du texte (force: true contourne la superposition de l'overlay Angular)
    cy.get('textarea[aria-label="Text field to review a product"], textarea#mat-input-1', { timeout: 10000 })
      .focus()
      .type(reviewText, { force: true });

    // Clic sur le bouton de soumission
    cy.get('#submitButton').click({ force: true });

    // Verification du retour API (200 / 201)
    cy.wait('@postReview').its('response.statusCode').should('be.oneOf', [200, 201]);

    // Fermeture de la dialog si nécessaire et vérification du texte
    cy.get('mat-expansion-panel').first().click({ force: true });
    cy.contains(reviewText).should('exist');
  });
});