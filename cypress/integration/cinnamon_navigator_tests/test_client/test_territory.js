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
    cy.get('[href="/land-plots"] span').click()
    cy.get('.my-areas-client-header .v-input').should('be.visible') 
    cy.get('.my-areas-client-filter').should('be.visible') 
    cy.get('.my-areas-client-table__card').should('have.length', 3).should('be.visible')
    cy.get('.my-areas-client-table__card').find('.my-areas-client-table__status').should('have.length', 3).and('be.visible')
    cy.get('.my-areas-client-table__card').find('.my-areas-client-table__btn-open').should('have.length', 3).and('be.visible')
    cy.get('.my-areas-client-table__card').first().find('.my-helper-card-column-item__text').should('have.length', 7).and('be.visible')
    // cy.get('.my-helper-card-column-item__text').should('be.visible') 
  })
  it('check main filter', () => {
    cy.get('.my-areas-client-header .v-input').click()
    // cy.get('.v-list-item__title').contains('Петрозаводский ГО').click()
    // cy.get('.v-list-item__content > .v-list-item__title').first().then( district => {
    //   district.click()
    // })
    //ДОПИСАТЬ С ЛОКАТОРАМИ НОВЫМИ
  })
  it.only('check additional filter', () => {
    cy.get('.my-areas-client-filter > button').click()
  })
})