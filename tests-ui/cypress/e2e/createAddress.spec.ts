describe('Test de création d\'adresse de livraison', () => {
  beforeEach(() => {
    const userEmail = `testuser_${Date.now()}@test.com`;
    const userPassword = 'Password123!';

    // 1. Création de l'utilisateur de test via l'API
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
      // 2. Connexion pour récupérer le token et contourner les bannières
      cy.request('POST', 'http://localhost:3000/rest/user/login', {
        email: userEmail,
        password: userPassword
      }).then((response) => {
        localStorage.setItem('token', response.body.authentication.token);
        localStorage.setItem('welcomebanner_status', 'dismiss');
        localStorage.setItem('cookieconsent_status', 'dismiss');
      });
    });

    // 3. Navigation vers le formulaire de création
    cy.visit('http://localhost:3000/#/address/create');
  });

  it('devrait permettre de créer une nouvelle adresse de livraison', () => {
    // Intercepter la requête POST de création d'adresse
    cy.intercept('POST', '**/api/Addresss*').as('createAddress');

    // Remplissage des champs du formulaire
    cy.get('input[placeholder*="country"]').type('France');
    cy.get('input[placeholder*="name"]').type('Jean Dupont');
    cy.get('input[placeholder*="mobile"]').type('0601020304');
    cy.get('input[placeholder*="ZIP"]').type('75001');
    cy.get('textarea[placeholder*="address"]').type('123 Rue de la Paix');
    cy.get('input[placeholder*="city"]').type('Paris');
    cy.get('input[placeholder*="state"]').type('Île-de-France');

    // Soumission du formulaire
    cy.get('#submitButton').click();

    // Attente de la confirmation API (201 Created)
    cy.wait('@createAddress').its('response.statusCode').should('eq', 201);

    // Redirection vers la liste des adresses
    cy.visit('http://localhost:3000/#/address/saved');

    // Vérification de la présence de l'adresse dans le composant Angular
    cy.get('mat-table, mat-card', { timeout: 10000 })
      .should('contain', '123 Rue de la Paix');
  });
});