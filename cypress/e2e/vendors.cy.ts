import {businessUser} from '../support/helper'
import {loginPage} from '../pages/login.page'
import {navbar} from '../pages/navbar'
import {vendorsPage} from '../pages/vendors.page'
import {faker} from '@faker-js/faker'

const randomName = faker.person.fullName()

describe('CB-008 Create vendor', () => {
  let vendorId: string

  beforeEach('Set token', () => {
    window.localStorage.setItem('token', Cypress.env('token'))
  })

  it('Verify new vendor is created', function () {
    navbar.openBasePage()
    navbar.goTo('vendors')
    vendorsPage.createVendorButton.should('exist').click()
    vendorsPage.vendorNameInput.type(randomName)
    cy.intercept('POST', '**/vendor').as('newVendor')
    vendorsPage.createButton.click()
    cy.wait('@newVendor')
      .its('response')
      .then(response => {
        expect(response.statusCode).eq(200)
      })
    cy.get('@newVendor').then((newVendor: any) => {
      cy.wrap(newVendor.response.body.payload).as('id')
      vendorId = newVendor.response.body.payload
      cy.get(`a[href="/v5/vendor/${vendorId}"]`).should('exist').and('have.length', 1)
    })
  })

  after('Delete vendor UI', function () {
    const id = this.id
    window.localStorage.setItem('token', Cypress.env('token'))
    navbar.openBasePage()
    cy.intercept('POST', '**/vendor/search').as('vendor')
    navbar.vendors.should('exist').click()
    cy.wait('@vendor')
    cy.get(`[data-row-key="${id}"]`).should('exist').find('#top-menu img').trigger('mouseover')
    cy.contains('span', 'Delete').click()
    cy.get('[class="ant-modal-content"]').should('exist')
    cy.intercept('DELETE', `**/${id}`).as('deleted')
    cy.get('[class="ant-btn ant-btn-default ant-btn-dangerous"]')
      .should('exist')
      .and('have.css', 'border-bottom-color', 'rgb(255, 120, 117)')
      .click()
    cy.wait('@deleted')
      .its('response')
      .then(response => {
        expect(response.statusCode).eq(200)
      })
  })
})

describe('CB-009 Mocking vendor', () => {
  it('Mocking one vendor ', () => {
    window.localStorage.setItem('token', Cypress.env('token'))
    cy.fixture('mockVendors').then(mockVendor => {
      const id = mockVendor.payload.items[0]._id
      navbar.openBasePage()
      cy.intercept('POST', '**/vendor/search', {fixture: 'mockVendors.json'}).as('vendorSearch')
      navbar.vendors.should('exist').click()
      cy.wait('@vendorSearch')
      cy.contains('a', 'Mock order name').should('exist')
      cy.get('tbody').find('tr').should('have.length', 1)
      cy.get(`a[href="/v5/vendor/${id}"]`).should('exist')
    })
  })
})

describe('CB-019 Edit new vendor', () => {
  const randomName = faker.person.fullName()
  const phone = faker.phone.number('##########')
  let vendorId: string

  it('Create vendor API and edit', function () {
    vendorsPage
      .createNewVendorApi(randomName, phone, 'emai@email.com', 'description', Cypress.env('token'))
      .then(response => {
        vendorId = response.body.payload
        cy.wrap(response.body.payload).as('vendorID')
        window.localStorage.setItem('token', Cypress.env('token'))
        navbar.openBasePage()
        navbar.goTo('vendors')
        cy.get(`[href="/v5/vendor/${vendorId}"]`).should('exist').click()
        cy.contains('h1', randomName).should('exist')
        navbar.vendors.click()
        cy.get(`[href="/v5/vendor/${vendorId}"]`).should('exist')
        cy.get(`[data-row-key="${vendorId}"]`).find('#top-menu span').trigger('mouseover')
        cy.intercept('GET', `**/vendor/${vendorId}`).as('newVendor')
        cy.contains('span', 'Edit').click()
        cy.wait('@newVendor')
        vendorsPage.vendorNameInput.should('have.value', randomName)
        vendorsPage.vendorNameInput.clear()
        cy.get('[class="ant-form-item-explain-error"]')
          .should('exist')
          .and('have.css', 'color', 'rgb(255, 77, 79)')
        vendorsPage.vendorNameInput.type('new name')
        cy.contains('span', 'Update').click()
        cy.wait('@vendor')
        cy.get(`[href="/v5/vendor/${vendorId}"]`).should('exist').click()
        cy.wait('@newVendor')
        cy.contains('h1', randomName).should('not.exist')
        cy.contains('h1', 'new name').should('exist')
      })
  })

  after('Delete vendor API', function () {
    const vendorID = this.vendorID
    cy.deleteItem(businessUser.email, businessUser.pass, 'vendor', vendorID)
  })
})

describe('CB-021 Search by name',()=>{
  
  const vendorName = faker.person.firstName()
  const phone = faker.phone.number('##########')
  let vendorId: string

  it('Create new vendor',()=>{
    vendorsPage
      .createNewVendorApi(vendorName, phone, 'emai@email.com', 'description', Cypress.env('token'))
      .then((response)=>{
        vendorId = response.body.payload
        cy.wrap(response.body.payload).as('vendorID')
        window.localStorage.setItem('token', Cypress.env('token'))
        navbar.openBasePage()
        navbar.goTo('vendors')
        vendorsPage.vendorSearch.type(vendorName)
        cy.wait('@vendor')
        cy.get(`[data-row-key="${vendorId}"]`).should('exist')
        .and('have.length',1)
      })
  })

  it('Delete vendor API', function () {
    const vendorID = this.vendorID
    cy.deleteItem(businessUser.email, businessUser.pass, 'vendor', vendorID)
  })

  it('Verify vendor deleted',function(){
    const vendorID = this.vendorID
    window.localStorage.setItem('token', Cypress.env('token'))
    navbar.openBasePage()
    navbar.goTo('vendors')
    vendorsPage.vendorSearch.type(vendorName)
    cy.wait('@vendor')
    cy.get(`[data-row-key="${vendorID}"]`).should('not.exist')
  })


})
