class ServicesPage{

    get createService(){
        return cy.contains('button','Create Service')
    }

    get serviceName(){
        return cy.get('#name')
    }

    get vendorName(){
        return cy.get('.ant-select-in-form-item')
    }

    get description(){
        return cy.get('#description')
    }



}
export const servicesPage = new ServicesPage()