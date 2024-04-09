class ClientsPage{
    get clientName(){
        return  cy.get('[id="name"][class="ant-input"]')
    }
    get clientPhone(){
        return cy.get('[id="phone"][class="ant-input"]')
    }
    get createClientButton(){
        return cy.get('[class="ant-drawer-content-wrapper"] [class="ant-btn ant-btn-primary"]')
    }
    get allClients(){
        return cy.get('[href="/v5/client"]')
    }
}
export const clientsPage = new ClientsPage()