import './commands'
import {businessUser} from '../support/helper'

before('Getting the token', () => {
  cy.request({
    method: 'POST',
    url: businessUser.apiUrl + '/user/login',
    body: {
      email: businessUser.email,
      password: businessUser.pass,
    },
  }).then(response => {
    Cypress.env('token', response.body.payload.token)
  })
})
