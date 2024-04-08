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
    it('Verify error message Required,loginCompanyName input', () => {
        cy.visit(businessUser.regPage)
        regPage.loginCompanyName.should('exist')
            .type('Company Name')
            .clear()
        cy.contains('div','Required')
            .should('exist')
            .and('have.css','color','rgb(255, 77, 79)')
    });
    it('Verify error message Required,firstName input', () => {
        cy.visit(businessUser.regPage)
        regPage.regFirstName.should('exist')
            .type('Company Name')
            .clear()
        cy.contains('div','Required')
            .should('exist')
            .and('have.css','color','rgb(255, 77, 79)')
    });
    it('Verify error message Required,lastName input', () => {
        cy.visit(businessUser.regPage)
        regPage.regLastName.should('exist')
            .type('Company Name')
            .clear()
        cy.contains('div','Required')
            .should('exist')
            .and('have.css','color','rgb(255, 77, 79)')
    });
    it('Verify error message Required,regLoginName input', () => {
        cy.visit(businessUser.regPage)
        regPage.regLoginName.should('exist')
            .type('Company Name')
            .clear()
        cy.contains('div','Required')
            .should('exist')
            .and('have.css','color','rgb(255, 77, 79)')
    });
    it('Verify error message Required,regPass input', () => {
        cy.visit(businessUser.regPage)
        regPage.regPass.should('exist')
            .type('Company Name')
            .clear()
        cy.contains('div','Required')
            .should('exist')
            .and('have.css','color','rgb(255, 77, 79)')
    });
    it('Verify error message Required for each field', () => {
        cy.visit(businessUser.regPage)
        cy.get('input').each((inputs)=>{
            cy.wrap(inputs).should('exist')
                .and('be.visible')
                .type('Something')
                .clear()
            cy.contains('div','Required')
                .should('have.length',inputs.length)
        })
    });
})