const { testLinks } = require("../../../support/page_objects/testLinks")
const { visitPageAndCheck } = require("../../../support/page_objects/visitPageAndCheck")
const { testSlider } = require("../../../support/page_objects/testSlider")
const { openNew } = require("../../../support/page_objects/openingNew")
const { scrollUp } = require("../../../support/page_objects/scrollUp")
const { changeLang } = require("../../../support/page_objects/changeLanguage")

//проверяем главную страницу
describe('test main page', () => {
  before(() => {
    visitPageAndCheck.visitPageAndCheck('/', 'инвестору в республике карелия')
  })
  //проверяем все ссылки на странице
  it('test links', () => {
    testLinks.testLinks('.page-index__support-content .my-main-client-card-link__link')
    testLinks.testLinks('.page-index__help-content-card a')
  })
  //проверяем кнопку скролаа наверх
  it('test scroll up', () => {
    scrollUp.scrollUp('.v-btn--bottom')
  })
  //проверка возможности листать слайдер с новостями
  it('click next/previous button', () => {
    testSlider.testSlider('.v-window-item--active .v-list-item__title', '.my-news-client-last-three-news__flot-next-btn', '.my-news-client-last-three-news__flot-prev-btn', '.text-center > :nth-child(1)', '.text-center > :nth-child(2)')
    //не хватает проверки на активность кнопки на слайдере. но у нее неоднозначный локатор. когда сделают нормальный локатор - дописать тест
  })
  //проверка смены языка
  it('change languages', () => {
    changeLang.changeLangByVal('.v-btn-toggle .v-btn--active', '.v-btn-toggle button:not(.v-btn--active)', 'val')
  })
  //проврека открытия новости
  it('test opening new', () => {
    // openNew.testOpeningNew('.my-news-client-table-view .v-btn', '/news/')
    openNew.testOpeningNew('.v-card__actions > .v-btn', '/news/')
  })

  //кнопку авторизации также не проверял, проверю в админской части.

  //поиск по сайту не работает, его не проверял
})