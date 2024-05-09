class ServicesPage{

    get createService(){
        return cy.contains('button','Create Service')
    }

    get serviceName(){
        return cy.get('[class="ant-drawer-body"] #name')
    }

    get vendorName(){
        return cy.get('input[class="ant-select-selection-search-input"]')
    }

    get description(){
        return cy.get('#description')
    }

    get vendorPrice(){
        return cy.get('#vendorPrice')
    }

    get clientPrice(){
        return cy.get('#clientPrice')
    }

    get createServiceButton(){
        return cy.get('[class="ant-drawer-wrapper-body"] [class="ant-btn ant-btn-primary"]')
    }



}
export const servicesPage = new ServicesPage()