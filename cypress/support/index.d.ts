declare namespace Cypress {
    interface Chainable<Subject = any> {
        // Example custom command to interact with a specific element
        deleteClient(email: string, password: string,clientId:string): Chainable<any>;
    }
}