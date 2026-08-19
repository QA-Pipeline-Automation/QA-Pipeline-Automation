/// <reference types="cypress" />

describe('Test de gestion du profil utilisateur', () => {
  let authToken: string;

  beforeEach(() => {
    const userEmail = `profileuser_${Date.now()}@test.com`;
    const userPassword = 'Password123!';
    authToken = '';

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
      cy.request('POST', `${Cypress.config('baseUrl')}/rest/user/login`, {
        email: userEmail,
        password: userPassword
      }).then((response) => {
        authToken = response.body.authentication.token;
        cy.setCookie('token', authToken);
      });
    });
  });

  it('devrait modifier le nom d\'utilisateur (username) avec succès', () => {
    const newUsername = `AutomationUser_${Math.floor(Math.random() * 1000)}`;

    cy.visit('/profile');

    cy.get('#username', { timeout: 10000 }).clear().type(newUsername);
    cy.get('#submit').click();

    cy.visit('/profile');
    cy.get('#username').should('have.value', newUsername);
  });
});