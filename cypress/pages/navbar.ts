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

    openVendors(){
        cy.intercept('POST' ,'**/vendor/search').as('vendor')
        this.vendors.click()
        cy.wait('@vendor',{timeout:5000}).its('response')
        .then((response)=>{
            expect(response.statusCode).eq(200)
        })
    }

    goTo(page : string){
        if(page==='vendors'){
            this.openVendors()
        } else if(page==='services'){
            this.openServices
        } else if(page==='clients'){
            this.opetnClientsPage()
        }
    }
}
export const navbar = new Navbar()