describe('test page territory', () => {
  before('test page opening', () => {
    cy.visit('/')
    cy.get('[href="/land-plots"] span').then(element => {
      element.click()
    })
    cy.get('.my-areas-client-header__text').contains('Реестр территорий')
  })
  it('test elements exist on page', () => {
    cy.visit('/')
    cy.get('[href="/land-plots"] span').then(element => {
      element.click()
    })
    cy.get('.my-areas-client-header .v-input').should('be.visible')
    cy.get('.my-areas-client-filter').should('be.visible')
    cy.get('.my-areas-client-table__card').should('have.length', 3).should('be.visible')
    cy.get('.my-areas-client-table__card').find('.my-areas-client-table__status').should('have.length', 3).and('be.visible')
    cy.get('.my-areas-client-table__card').find('.my-areas-client-table__btn-open').should('have.length', 3).and('be.visible')
    cy.get('.my-areas-client-table__card').first().find('.my-helper-card-column-item__text').should('have.length', 7).and('be.visible')
    // cy.get('.my-helper-card-column-item__text').should('be.visible') 
  })
  it.only('check main filter', () => {
    cy.get('.my-areas-client-header .v-input').click()
    cy.get('[role="option"]').first().invoke('text').then((text1) => {
      cy.get('[role="option"]').first().click().then(() => {
        cy.get('.my-areas-client-table__card').each($el => {
          cy.wrap($el).find('[data-test="Район"] .my-helper-card-column-item__text').invoke('text').then(text2 => {
            expect(text2).to.have.string(text1)
          })
        })
      })
    })
  })
  it('check additional filter', () => {
    cy.get('.my-areas-client-filter > button').click()
  })
})