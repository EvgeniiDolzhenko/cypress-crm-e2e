import {businessUser} from '../support/helper'
import {regPage} from '../pages/reg.page'
import {faker} from '@faker-js/faker'
describe('CB-004 Reg page inputs validation', () => {
 
  it('Verify inputs', () => {
    cy.visit(businessUser.regPage)
    regPage.loginCompanyName.should('exist')
    regPage.regFirstName.should('exist')
    regPage.regLastName.should('exist')
    regPage.regLoginEmail.should('exist')
    regPage.regPass.should('exist')
  })
})

describe('CB-005 Reg page inputs error validation', () => {
  beforeEach(() => {
    cy.visit(businessUser.regPage)
  })

  it('Verify error message Required,loginCompanyName input', () => {
    regPage.loginCompanyName.should('exist').type('Company Name').clear()
    cy.contains('div', 'Required').should('exist').and('have.css', 'color', 'rgb(255, 77, 79)')
  })
  it('Verify error message Required,firstName input', () => {
    regPage.regFirstName.should('exist').type('Company Name').clear()
    cy.contains('div', 'Required').should('exist').and('have.css', 'color', 'rgb(255, 77, 79)')
  })
  it('Verify error message Required,lastName input', () => {
    regPage.regLastName.should('exist').type('Company Name').clear()
    cy.contains('div', 'Required').should('exist').and('have.css', 'color', 'rgb(255, 77, 79)')
  })
  it('Verify error message Required,regLoginName input', () => {
    regPage.regLoginEmail.should('exist').type('Company Name').clear()
    cy.contains('div', 'Required').should('exist').and('have.css', 'color', 'rgb(255, 77, 79)')
  })
  it('Verify error message Required,regPass input', () => {
    regPage.regPass.should('exist').type('Company Name').clear()
    cy.contains('div', 'Required').should('exist').and('have.css', 'color', 'rgb(255, 77, 79)')
  })
  it('Verify error message Required for each field', () => {
    cy.get('input').each(inputs => {
      cy.wrap(inputs).should('exist').and('be.visible').type('Something').clear()
      cy.contains('div', 'Required').should('have.length', inputs.length)
    })
  })
})

describe('CB-011 Register new client E2E positive', () => {
  it('Create a new client', () => {
    cy.visit(businessUser.regPage)
    regPage.loginCompanyName.should('exist').type(faker.company.name())
    regPage.regFirstName.should('exist').type(faker.person.firstName().replace(/[^\w\s]/gi, ''))
    regPage.regLastName.should('exist').type(faker.person.lastName().replace(/[^\w\s]/gi, ''))
    regPage.regLoginEmail.should('exist').type(faker.internet.email())
    regPage.regPass.should('exist').type(faker.internet.password())
    cy.get('.ant-btn-lg').should('exist').and('have.css', 'background-color', 'rgb(78, 78, 145)')
    cy.intercept('POST', '**/user').as('newUser')
    cy.get('.ant-btn-lg').click()
    cy.wait('@newUser').then(newUser => {
      expect(newUser.response.statusCode).eq(201)
    })
    cy.url().should('contain', '/onboarding')
  })
})

describe('Verify password field',()=>{
  it('Verify eye-invisible',()=>{
    cy.visit(businessUser.regPage)
regPage.regPass.type('123')
cy.get('[class="ant-form-item-feedback-icon ant-form-item-feedback-icon-success"]').should('exist')
regPage.regLastName.type('test')
regPage.regPass.should('have.prop','defaultValue','')
cy.get('[data-icon="eye-invisible"]').click()
regPage.regPass.should('have.prop','defaultValue','123')
  })
})
