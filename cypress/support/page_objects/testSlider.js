export class testAllSliders {
  testSlider(locatorText, locatorButtonNext, locatorButtonPrevoius) {
    cy.get(locatorText).invoke('text').then((text1) => {
      cy.get(locatorButtonNext).click()
      cy.get(locatorText).invoke('text').should((text2) => {
        expect(text1).not.to.eq(text2)
      })
      cy.get(locatorButtonPrevoius).click()
      cy.get(locatorText).invoke('text').should((text3) => {
        expect(text1).to.eq(text3)
      })
    })
  }
}
export const testSlider = new testAllSliders()