import {businessUser} from '../support/helper'
import {loginPage} from "../pages/login.page";

const invalidEmail : string = 'invalid@gmail.com'
const invalidPass : string = 'invalid'


describe('e2e CB-001,success login', () => {
    before(()=>{
        cy.intercept('GET','**/user/auth').as('auth')
    })
  it('Verify positive login scenario', () => {
    cy.visit('/user/login')
    loginPage.email.type(businessUser.email)
    loginPage.pass.type(businessUser.pass)
    loginPage.submitButton.click()
    cy.wait('@auth').its('response')
        .then((response)=>{
          expect(response.body.message).eq('Auth ok')
          expect(response.statusCode).eq(200)
    })
      cy.url().should('contain','/client')
  })
})
describe('e2e Negative scenarios',()=>{

    beforeEach(()=>{
        cy.intercept('POST','**/user/login').as('badLogin')
    })

    it('CB-002,incorrect email', () => {
        cy.visit('/user/login')
        loginPage.email.type(invalidEmail)
        loginPage.pass.type(businessUser.pass)
        loginPage.submitButton.click()
        cy.wait('@badLogin')
        cy.contains('div','Auth failed').should('exist')
        cy.get('@badLogin').its('response').then((response)=>{
            expect(response.statusCode).eq(400)
        })
    });
    it('CB-003,incorrect pass', () => {
        cy.visit('/user/login')
        loginPage.email.type(businessUser.email)
        loginPage.pass.type(invalidPass)
        loginPage.submitButton.click()
        cy.wait('@badLogin')
        cy.contains('div','Auth failed').should('exist')
        cy.get('@badLogin').its('response').then((response)=>{
            expect(response.statusCode).eq(400)
        })
    });
})