import {businessUser} from '../support/helper'
import {regPage} from "../pages/reg.page";

describe('CB-004 Reg page inputs validation',()=>{
    it('Verify inputs', () => {
        cy.visit(businessUser.regPage)
        regPage.loginCompanyName.should('exist')
        regPage.regFirstName.should('exist')
        regPage.regLastName.should('exist')
        regPage.regLoginName.should('exist')
        regPage.regPass.should('exist')
    });
})

describe('CB-005 Reg page inputs error validation',()=>{
    it('Verify error message', () => {
        cy.visit(businessUser.regPage)
        regPage.loginCompanyName.should('exist')
            .type('Company Name')
            .clear()
        cy.contains('div','Required')
            .should('exist')
            .and('have.css','color','rgb(255, 77, 79)')
    });
})