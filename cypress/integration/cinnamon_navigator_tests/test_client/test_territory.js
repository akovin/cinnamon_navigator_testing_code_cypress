const { testSorting } = require("../../../support/page_objects/testSorting")

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
  it('check main filter', () => {
    cy.get('.my-areas-client-header .v-input').click()
    cy.get('[role="option"]').first().invoke('text').then((text1) => {
      cy.get('[role="option"]').first().click().wait(500).then(() => {
        cy.get('.my-areas-client-table__card').each($el => {
          cy.wrap($el).find('[data-test="Район"] .my-helper-card-column-item__text').invoke('text').then(text2 => {
            expect(text2).to.have.string(text1)
          })
        })
      })
    })
  })
  it('check cadastral number  filter', () => {
    //проверка фильтра по кадастровому номеру
    cy.get('.my-areas-client-filter > button').click()
    cy.get('[data-test="Кадастровый номер"] .my-helper-card-column-item__text').first().invoke('text').then(cad_number_before => {
      cy.get('.my-areas-client-filter [data-test="Кадастровый номер"]').type(cad_number_before).wait(1500)
      cy.get('[data-test="Кадастровый номер"] .my-helper-card-column-item__text').each($el => {
        cy.wrap($el).invoke('text').then(cad_number_after => {
          expect(cad_number_after).to.equal(cad_number_before)
        })
      })
    })
    //проверка сортировки
    // cy.get('.my-areas-client-filter > button').click()
    // cy.get('[data-test="Сортировать по"]').click()
    //проверка фильтра по минимальному значению площад
  })
  it('check minimal area filter', () => {
    //проверка фильтра по минимальному значению площади
    cy.get('[data-test="Площадь"] .my-helper-card-column-item__text').first().invoke('text').then(area_before => {
      const area_number_before = Number(area_before.match(/\d+/g))
      cy.get('.my-areas-client-filter > button').click()
      cy.get('.my-areas-client-filter [data-test="Минимальное значение площади"]').type(area_number_before).wait(1500)
      cy.get('[data-test="Площадь"] .my-helper-card-column-item__text').each($el => {
        cy.wrap($el).invoke('text').then(area_number => {
          const area_number_after = Number(area_number.match(/\d+/g))
          cy.wrap(area_number_after).should('be.gte', area_number_before)
        })
      })
    })
  })
  it('check maximum area filter', () => {
    //проверка фильтра по минимальному значению площади
    cy.get('[data-test="Площадь"] .my-helper-card-column-item__text').first().invoke('text').then(area_before => {
      const area_number_before = Number(area_before.match(/\d+/g))
      cy.get('.my-areas-client-filter > button').click()
      cy.get('.my-areas-client-filter [data-test="Максимальное значение площади"]').type(area_number_before).wait(1500)
      cy.get('[data-test="Площадь"] .my-helper-card-column-item__text').each($el => {
        cy.wrap($el).invoke('text').then(area_number => {
          const area_number_after = Number(area_number.match(/\d+/g))
          cy.wrap(area_number_before).should('be.gte', area_number_after)
        })
      })
    })
  })
  //по Гектару не проверяю фильтрацию, т.к. она не работает
  it.only('check sorting', () => {
    testSorting.sortingByNumericValue('.my-areas-client-filter > button', '.my-areas-client-filter [data-test="Сортировать по"]',
      '.v-menu__content', '[data-test="Площадь"] .my-helper-card-column-item__text', 'Возрастанию площади', 0, true)
    testSorting.sortingByNumericValue('.my-areas-client-filter > button', '.my-areas-client-filter [data-test="Сортировать по"]',
      '.v-menu__content', '[data-test="Площадь"] .my-helper-card-column-item__text', 'Убыванию площади', 10000000000000000, false)
  })
})