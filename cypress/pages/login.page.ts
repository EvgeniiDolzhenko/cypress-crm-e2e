import {businessUser} from '../support/helper'

class LoginPage {
  get email() {
    return cy.get('#normal_login_email')
  }

  get pass() {
    return cy.get('#normal_login_password')
  }

  get submitButton() {
    return cy.contains('button', 'Log in').click()
  }

  apiLogin(url: string, email: string, pass: string) {
    cy.request({
      method: 'POST',
      url: url + '/user/login',
      body: {
        email: email,
        password: pass,
      },
    }).then(response => {
      Cypress.env('token', response.body.payload.token)
    })
  }
}
export const loginPage = new LoginPage()
