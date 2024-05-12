declare namespace Cypress {
    interface Chainable<Subject = any> {
        // Example of the command for deleting client 
        deleteClient(email: string, password: string,clientId:string): Chainable<any>;

        deleteItem(email: string, password: string,endPoint: string,id: string): Chainable<any>;
    }
}