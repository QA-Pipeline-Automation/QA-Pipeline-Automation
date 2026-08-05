describe('/#/search', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Fonctionnalité de recherche', () => {
    it('devrait rechercher et afficher un produit spécifique dans le catalogue', () => {
      // Clic sur l'icône loupe dans la barre supérieure
      cy.get('mat-icon').contains('search').click()
      
      // Saisie dans le champ de recherche apparu
      cy.get('#searchQuery input').type('Apple{enter}')

      // Vérifications
      cy.url().should('include', '/#/search?q=Apple')
      cy.get('.mat-card').contains('Apple Juice').should('be.visible')
    })
  })
})