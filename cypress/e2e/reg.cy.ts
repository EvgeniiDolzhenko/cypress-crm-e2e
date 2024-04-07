import {businessUser} from '../support/helper'
import {regPage} from "../pages/reg.page";

describe('CB-004 Reg page input validation',()=>{
    it('Verify inputs', () => {
        cy.visit(businessUser.regPage)
        regPage.loginCompanyName.should('exist')
        regPage.regFirstName.should('exist')
        regPage.regLastName.should('exist')
        regPage.regLoginName.should('exist')
        regPage.regPass.should('exist')
    });
})