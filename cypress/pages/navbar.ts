class Navbar{

    get clients(){
        return cy.get('[href="/v5/client"]')
    }

    get orders(){
        return cy.get('[href="/v5/order"]')
    }

    get vendors(){
        return cy.get('[href="/v5/vendor"]')
    }

    openBasePage(){
        cy.intercept('**/user/auth').as('login')
        cy.visit('/')
        cy.wait('@login')
    }
}
export const navbar = new Navbar()