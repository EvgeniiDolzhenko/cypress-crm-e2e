class Navbar{

    get clients(){
        return cy.get('[href="/v5/client"]')
    }

    openBasePage(){
        cy.intercept('**/user/auth').as('login')
        cy.visit('/')
        cy.wait('@login')
    }
}
export const navbar = new Navbar()