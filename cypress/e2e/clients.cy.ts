import {businessUser} from '../support/helper'
import {loginPage} from '../pages/login.page'
import {clientsPage} from '../pages/clients.page'
import {navbar} from '../pages/navbar'
import {faker} from '@faker-js/faker'

describe('CB-005 Create new client e2e positive', () => {
  const randomName = faker.person.fullName()
  const phone = faker.phone.number('##########')
  let clientId: string
  before('Api login', () => {
    loginPage.apiLogin(businessUser.apiUrl, businessUser.email, businessUser.pass)
  })

  beforeEach('Set token', () => {
    window.localStorage.setItem('token', Cypress.env('token'))
  })

  it('Verify creating new client', function () {
    navbar.openBasePage()
    cy.get('[href="/v5/client"]').click()
    cy.intercept('POST', '**/client/search').as('search')
    cy.contains('button', 'Create Client').should('exist').click()
    cy.wait('@search')
    cy.wait(1000)
    clientsPage.clientName.should('exist').type(randomName)
    clientsPage.clientPhone.should('exist').type(phone)
    cy.intercept('POST', '**/client').as('newClient')
    clientsPage.createClientButton.click()
    cy.wait('@newClient').then(newClient => {
      clientId = newClient.response.body.payload
      cy.wrap(newClient.response.body.payload).as('clientId')
      cy.contains('td', randomName).should('exist')
      cy.get(`a[href="/v5/client/${clientId}"]`).should('exist').click()
      cy.url().should('contain', clientId)
      cy.contains('tr', phone).should('exist')
    })
  })

  after('Delete client API', function () {
    const clientId = this.clientId
    cy.deleteClient(businessUser.email, businessUser.pass, clientId)
  })
})

describe('CB-006 Verify clients on page 2', () => {
  const clientsPage1 = []
  const clientsPage2 = []

  before('Api login', () => {
    loginPage.apiLogin(businessUser.apiUrl, businessUser.email, businessUser.pass)
  })

  beforeEach('Set token', () => {
    window.localStorage.setItem('token', Cypress.env('token'))
  })

  it('Verify client are not duplicated', () => {
    navbar.openBasePage()
    cy.intercept('POST', '**/client/search').as('search')
    navbar.clients.should('exist').click()
    cy.wait('@search')
    cy.get('tr td a').each(names => {
      clientsPage1.push(names.text())
    })
    cy.get('body').then(body => {
      if (body.find('[title="2"]').length > 0) {
        cy.get('[title="2"]').click()
        cy.wait('@search')
        cy.get('tr td a')
          .each(names => {
            clientsPage2.push(names.text())
          })
          .then(() => {
            cy.wrap(clientsPage1).should('not.have.members', clientsPage2)
          })
      }
    })
  })
})
describe('CB-007 Client mock', () => {
  before('Api login', () => {
    loginPage.apiLogin(businessUser.apiUrl, businessUser.email, businessUser.pass)
  })

  it('Mock one client in searching ', () => {
    window.localStorage.setItem('token', Cypress.env('token'))
    cy.fixture('mockClients').then(mockClient => {
      const id = mockClient.payload.items[0]._id
      navbar.openBasePage()
      cy.intercept('POST', '**/client/search', {fixture: 'mockClients.json'}).as('search')
      clientsPage.allClients.click()
      cy.wait('@search')
      cy.contains('a', 'Testing').should('exist')
      cy.get('tbody').find('tr').should('have.length', 1)
      cy.get(`a[href="/v5/client/${id}"]`).should('exist')
    })
  })
})

describe('CB-011 Create client API', () => {
  const randomName = faker.person.fullName()
  const phone = faker.phone.number('##########')
  let clientId: string

  before('Api login and create client', () => {
    loginPage.apiLogin(businessUser.apiUrl, businessUser.email, businessUser.pass)
  })

  it('Verify new client', () => {
    clientsPage
      .createNewClientApi(randomName, phone, 'emai@email.com', 'description', Cypress.env('token'))
      .then(response => {
        clientId = response.body.payload
        window.localStorage.setItem('token', Cypress.env('token'))
        navbar.openBasePage()
        navbar.opetnClientsPage()
        cy.get(`[href="/v5/client/${clientId}"]`).should('exist').click()
        cy.contains('h1', randomName).should('exist')
        cy.url().should('include', clientId)
      })
  })
})
