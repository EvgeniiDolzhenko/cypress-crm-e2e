import {businessUser} from '../support/helper'
import {loginPage} from "../pages/login.page";
import {navbar} from "../pages/navbar";

describe('CB-008 Create vendor',()=>{

    before('Api login',()=>{
        loginPage.apiLogin(businessUser.apiUrl,businessUser.email,businessUser.pass)
    })

    beforeEach('Set token',()=>{
        window.localStorage.setItem('token',Cypress.env('token'))
    })

    it('Verify new vendor is created', () => {
        navbar.openBasePage()
        cy.intercept('POST','**/vendor/search').as('vendor')
        navbar.vendors.should('exist')
            .click()
        cy.wait('@vendor').its('response')
            .then((response)=>{
                expect(response.statusCode).eq(200)
            })
        cy.contains('button','Create Vendor')
            .should('exist')
    });
})