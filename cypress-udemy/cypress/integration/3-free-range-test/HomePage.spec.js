














describe('Home de www.freerangetesters.com', () => {
  beforeEach(() => {
    cy.visit('https://www.freerangetesters.com/')
  })

  it('debe Incluir en el titulo los caracteres', () => {
    cy.title().should('include', 'Free Range Testers')
  })

  it('Deben existir 12 cursos con el botón ver mas', () => {
    cy.contains('Cursos').click()
    cy.get('[data-testid="linkElement"] > .M3I7Z2').should('have.length', 12)
  })

  it('Hay un link llamada blog en la barra de navegación', () => {
    cy.get('#comp-l02x1m8d1label').should('contain.text', 'Blog')
  })
})