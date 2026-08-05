/// <reference types="cypress" />

describe('Test de gestion du profil utilisateur', () => {
  const userEmail = `profileuser_${Date.now()}@test.com`;
  const userPassword = 'Password123!';

  beforeEach(() => {
    // 1. Création de l'utilisateur dédié pour le test
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
      // 2. Utilisation de la commande personnalisée ou connexion via l'API Juice Shop
      cy.login({ email: userEmail, password: userPassword });
    });
  });

  it('devrait modifier le nom d\'utilisateur (username) avec succès', () => {
    const newUsername = `AutomationUser_${Math.floor(Math.random() * 1000)}`;

    // Accès à la route /profile comme dans le code du projet
    cy.visit('/profile');

    // Saisie dans le champ #username et clic sur #submit (exactement comme dans le code original)
    cy.get('#username', { timeout: 10000 }).clear().type(newUsername);
    cy.get('#submit').click();

    // Rechargement pour vérifier la mise à jour
    cy.visit('/profile');
    cy.get('#username').should('have.value', newUsername);
  });
});