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

    get services(){
        return cy.get('[href="/v5/service"]')
    }

    openBasePage(){
        cy.intercept('**/user/auth').as('login')
        cy.visit('/')
        cy.wait('@login')
    }

    opetnClientsPage(){
        cy.intercept('POST' ,'**/client/search').as('clients')
        navbar.clients.click()
        cy.wait('@clients')
    }

    openServices(){
        cy.intercept('POST' ,'**/service/search').as('service')
        this.services.click()
        cy.wait('@service')
    }
}
export const navbar = new Navbar()