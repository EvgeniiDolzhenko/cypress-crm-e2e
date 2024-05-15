import {faker} from '@faker-js/faker'
import {servicesPage} from '../pages/services.page'
import {vendorsPage} from '../pages/vendors.page'
import {navbar} from '../pages/navbar'

describe('CB-014 Verify new Service e2e', () => {
  const randomName = faker.person.fullName()
  let serviceId: string

  beforeEach('Set token', () => {
    window.localStorage.setItem('token', Cypress.env('token'))
  })

  it('Create new service UI', () => {
    navbar.openBasePage()
    navbar.openServices()
    cy.url().should('include', '/service')
    servicesPage.createService.click()
    servicesPage.serviceName.type(randomName)
    servicesPage.description.type('Description')
    cy.intercept('POST', '**/vendor/search')
    servicesPage.vendorName.click({force: true})
    cy.get(
      '[class="rc-virtual-list-holder-inner"] [class="ant-select-item-option-content"]'
    ).should('exist')
    cy.get('[class="rc-virtual-list-holder-inner"] [aria-selected="false"]').then(vendorList => {
      cy.wrap(vendorList)
        .eq(Cypress._.random(0, vendorList.length - 1))
        .click({force: true})
    })
    servicesPage.vendorPrice.type('150')
    servicesPage.clientPrice.type('110')
    cy.intercept('POST', '**/service').as('newService')
    servicesPage.createServiceButton.click()
    cy.wait('@newService')
      .its('response')
      .then(response => {
        expect(response.statusCode).eq(200)
        expect(response.body.message).eq('Service created')
        serviceId = response.body.payload
        cy.get(`[href="/v5/service/${serviceId}"]`).click()
        cy.contains('h1', randomName).should('exist')
      })
  })
})

describe('CB-021 Create new vendor for new service E2E', () => {
  const randomName = faker.person.fullName()
  const phone = faker.phone.number('##########')
  let vendorId: string
  const clientPrice = Cypress._.random(1, 999).toString()
  const serviceName = faker.person.fullName()
  const vendorPrice = Cypress._.random(1, 999).toString()

  beforeEach('Set token', () => {
    window.localStorage.setItem('token', Cypress.env('token'))
  })

  it('Create new vendor and new service with this vendor using API', function () {
    vendorsPage
      .createNewVendorApi(randomName, phone, 'emai@email.com', 'description', Cypress.env('token'))
      .then(response => {
        vendorId = response.body.payload
      })
      .then(() => {
        servicesPage
          .createNewServiceApi(
            vendorId,
            clientPrice,
            serviceName,
            vendorPrice,
            Cypress.env('token')
          )
          .then(response => {
            expect(response.body.message).eq('Service created')
            expect(response.status).eq(200)
          })
      })
  })

  it('Verify new vendor with new service in UI',()=>{

  })

})
