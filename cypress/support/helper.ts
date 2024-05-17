const businessUser = {
  email: Cypress.env('email'),
  pass: Cypress.env('pass'),
  url: Cypress.env('url'),
  regPage: Cypress.env('regPage'),
  apiUrl: Cypress.env('apiUrl'),
}

const vieportSizes = [
  [1024, 768],
  [667, 375],
  [812, 375],
  [896, 414],
  [960, 1536],
]

export {businessUser, vieportSizes}
