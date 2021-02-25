export class testAllLinks {
  testLinks(locator) {
    cy.get(locator).then(hrefs => {
      for (let i = 0; i < hrefs.length; i++) {
        cy.get(hrefs[i])
          .invoke('attr', 'href')
          .then(href => {
            cy.request(href).its('status').should('eq', 200)
          })
      }
    })
  }
}
export const testLinks = new testAllLinks()