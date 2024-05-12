const businessUser = {
  email: Cypress.env('email'),
  pass: Cypress.env('pass'),
  url: Cypress.env('url'),
  regPage: Cypress.env('regPage'),
  apiUrl: Cypress.env('apiUrl'),
}

export {businessUser}
