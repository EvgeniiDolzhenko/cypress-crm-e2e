class RegPage{
    get loginCompanyName(){
        return cy.get('#user_login_companyName')
    }

    get regFirstName(){
       return cy.get('#user_login_firstName')
    }

    get regLastName(){
        return cy.get('#user_login_firstName')
    }

    get regLoginName(){
        return  cy.get('#user_login_email')
    }

    get regPass(){
        return cy.get('#user_login_password')
    }



}
export const regPage = new RegPage()