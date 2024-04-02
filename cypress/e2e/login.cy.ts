import {businessUser} from '../support/helper'
import {loginPage} from "../pages/login.page";
import exp = require("constants");

describe('CB-001,success login', () => {
  it('passes', () => {
    cy.visit('/')
    loginPage.email.type(businessUser.email)
    loginPage.pass.type(businessUser.pass)
    cy.intercept('GET','**/v5/user/auth').as('auth')
    loginPage.submitButton.click()
    cy.wait('@auth').its('response')
        .then((response)=>{
          console.log(response)
          expect(response.body.message).eq('Auth ok')
          expect(response.statusCode).eq(200)
    })
  })
})