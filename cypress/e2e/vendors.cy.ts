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

    it('Verify new vendor is created', function ()  {
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
            cy.wrap(newVendor.response.body.payload).as('id')
            vendorId = newVendor.response.body.payload
            cy.get(`a[href="/v5/vendor/${vendorId}"]`).should('exist')
                .and('have.length',1)
        })
    });

    after('Delete vendor UI',function (){
        const id = this.id
        window.localStorage.setItem('token',Cypress.env('token'))
        navbar.openBasePage()
        cy.intercept('POST','**/vendor/search').as('vendor')
        navbar.vendors.should('exist')
            .click()
        cy.wait('@vendor')
        cy.get(`[data-row-key="${id}"]`).should('exist')
            .find('#top-menu img').trigger('mouseover')
        cy.contains('span','Delete').click()
        cy.get('[class="ant-modal-content"]').should('exist')
        cy.intercept('DELETE',`**/${id}`).as('deleted')
        cy.get('[class="ant-btn ant-btn-default ant-btn-dangerous"]').should('exist')
            .and('have.css','border-bottom-color','rgb(255, 120, 117)')
            .click()
        cy.wait('@deleted').its('response').then((response)=>{
            expect(response.statusCode).eq(200)
        })

    })
})