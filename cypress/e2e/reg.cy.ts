import {businessUser} from '../support/helper'

describe('CB-004 Reg page input validation',()=>{
    it('Verify inputs', () => {
        cy.visit(businessUser.regPage)
        cy.get('#user_login_companyName').should('exist')
        cy.get('#user_login_firstName').should('exist')
        cy.get('#user_login_lastName').should('exist')
        cy.get('#user_login_email').should('exist')
        cy.get('#user_login_password').should('exist')
    });
})