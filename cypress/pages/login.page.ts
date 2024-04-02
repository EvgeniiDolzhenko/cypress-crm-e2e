class LoginPage  {
     get email(){
        return  cy.get('#normal_login_email')
    }

     get pass(){
       return cy.get('#normal_login_password')
    }

    get submitButton(){
       return cy.contains('button','Log in').click()
    }

    
}
export const loginPage = new LoginPage()