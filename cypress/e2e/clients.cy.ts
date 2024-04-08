import {businessUser} from '../support/helper'
import {loginPage} from "../pages/login.page";

const invalidEmail : string = 'invalid@gmail.com'
const invalidPass : string = 'invalid'

describe('CB-005 Create new client e2e positive',()=>{

    before('Api login',()=>{
        loginPage.apiLogin(businessUser.apiUrl,businessUser.email,businessUser.pass)
    })

    beforeEach('Set token',()=>{
        window.localStorage.setItem('token',Cypress.env('token'))
    })

    it('Verify new client', () => {
        cy.intercept('**/user/auth').as('login')
        cy.visit('/')
        cy.wait('@login')
        cy.get('[href="/v5/client"]').click()
        cy.contains('button','Create Client')
            .should('exist')
            .click()
    });
})