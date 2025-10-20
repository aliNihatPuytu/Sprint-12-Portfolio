describe('Portfolio Sprint', () => {
  it('loads and toggles language + theme', () => {
    cy.visit('/')
    cy.contains('Frontend')
    cy.contains("TÜRKÇE'YE GEÇ").click()
    cy.contains("Developer'ım")
    cy.contains('Dark Mode').parent().find('input').check({ force: true })
    cy.get('html').should('have.class', 'dark')
  })
})
