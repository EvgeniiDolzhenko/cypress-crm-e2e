import {businessUser} from '../support/helper'
import {loginPage} from "../pages/login.page";
import {navbar} from "../pages/navbar";
import {vendorsPage} from "../pages/vendors.page";
import { faker } from '@faker-js/faker';
const randomName = faker.person.fullName();

describe('CB-008 Create vendor',()=>{

    let vendorId: string
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
        vendorsPage.createVendorButton
            .should('exist')
            .click()
        vendorsPage.vendorNameInput.type(randomName)
        cy.intercept('POST','**/vendor').as('newVendor')
        vendorsPage.createButton.click()
        cy.wait('@newVendor').its('response').then((response)=>{
            expect(response.statusCode).eq(200)
        })
        cy.get('@newVendor').then((newVendor: any)=>{
            vendorId = newVendor.response.body.payload
            cy.get(`a[href="/v5/vendor/${vendorId}"]`).should('exist')
                .and('have.length',1)
        })
    });
})