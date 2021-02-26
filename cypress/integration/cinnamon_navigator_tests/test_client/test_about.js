describe('test about page opening', () => {
  //проверяем все ссылки на странице
  it('test page about', () => {
    cy.visit('/')
    cy.get('[href="/about"] span').then(element => {
      element.click()
    })
    cy.get('.page-about__header-text').contains('О проекте')
  })
})