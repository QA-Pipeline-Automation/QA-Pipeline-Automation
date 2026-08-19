/// <reference types="cypress" />

describe('Test de création d\'adresse de livraison', () => {
  let authToken: string;

  beforeEach(() => {
    const userEmail = `testuser_${Date.now()}@test.com`;
    const userPassword = 'Password123!';
    authToken = '';

    // 1. Création d'un utilisateur de test via l'API
    cy.request('POST', `${Cypress.config('baseUrl')}/api/Users`, {
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
      // 2. Connexion pour récupérer le token JWT
      cy.request('POST', `${Cypress.config('baseUrl')}/rest/user/login`, {
        email: userEmail,
        password: userPassword
      }).then((response) => {
        authToken = response.body.authentication.token;
      });
    });

    // 3. Navigation vers la page de création d'adresse en injectant les cookies / tokens
    cy.visit('/#/address/create', {
      onBeforeLoad(win) {
        win.localStorage.setItem('welcomebanner_status', 'dismiss');
        win.localStorage.setItem('cookieconsent_status', 'dismiss');
        if (authToken) {
          win.localStorage.setItem('token', authToken);
        }
      }
    });

    // 4. Fermeture explicite des overlays (Welcome Banner & Cookie Consent) si présents
    cy.get('body').then(($body) => {
      if ($body.find('button[aria-label="Close Welcome Banner"]').length > 0) {
        cy.get('button[aria-label="Close Welcome Banner"]').click({ force: true });
      }
      if ($body.find('a[aria-label="dismiss cookie message"]').length > 0) {
        cy.get('a[aria-label="dismiss cookie message"]').click({ force: true });
      }
      if ($body.find('.cdk-overlay-backdrop').length > 0) {
        cy.get('body').type('{esc}', { force: true });
      }
    });
  });

  it('devrait permettre de créer une nouvelle adresse de livraison', () => {
    cy.intercept('POST', '**/api/Addresss*').as('createAddress');

    // Saisie dans tous les champs du formulaire avec force: true
    cy.get('input[placeholder*="country"]').type('France', { force: true });
    cy.get('input[placeholder*="name"]').type('Jean Dupont', { force: true });
    cy.get('input[placeholder*="mobile"]').type('0601020304', { force: true });
    cy.get('input[placeholder*="ZIP"]').type('75001', { force: true });
    cy.get('textarea[placeholder*="address"]').type('123 Rue de la Paix', { force: true });
    cy.get('input[placeholder*="city"]').type('Paris', { force: true });
    cy.get('input[placeholder*="state"]').type('Île-de-France', { force: true });

    // Soumission du formulaire
    cy.get('#submitButton').click({ force: true });

    // Attente de la requête API et vérification du statut 201 Created
    cy.wait('@createAddress').its('response.statusCode').should('eq', 201);

    // Vérification que l'adresse apparaît dans la liste des adresses sauvegardées
    cy.visit('/#/address/saved');
    cy.get('mat-table, mat-card', { timeout: 10000 })
      .should('contain', '123 Rue de la Paix');
  });
});