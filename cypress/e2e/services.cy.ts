import {businessUser} from '../support/helper'
import {loginPage} from "../pages/login.page";

import { servicesPage } from '../pages/services.page';
import {navbar} from "../pages/navbar";



describe('CB-014 Verify new Service e2e',()=>{

    before('Api login',()=>{
        loginPage.apiLogin(businessUser.apiUrl,businessUser.email,businessUser.pass)
    })

    beforeEach('Set token',()=>{
        window.localStorage.setItem('token',Cypress.env('token'))
    })


    it('Create new service UI', () => {
        navbar.openBasePage()
        navbar.openServices()
        cy.url().should('include','/service')
        servicesPage.createService.click()
        servicesPage.description.type('something')
        servicesPage.vendorName.click()
        cy.get('[class="rc-virtual-list-holder-inner"] [class="ant-select-item-option-content"').should('exist')
        cy.get('[class="rc-virtual-list-holder-inner"] [aria-selected="false"]').then((vendorList)=>{
            cy.wrap(vendorList).eq(Cypress._.random(0,vendorList.length-1)).click()
        })
    });
})
