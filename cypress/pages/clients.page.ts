import {businessUser} from "../support/helper";

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

    createNewClientApi(name:string, phone: string, email : string, description : string, token : string ){
        return cy.request({
            method: 'POST',
            url: businessUser.apiUrl+'/client',
            headers:{
                Authorization: token
            },
            body:{
                name,
                phone,
                email,
                description
            }
        }).then((response)=>{
            expect(response.body.payload).a('string')
        }).then(cy.wrap<any>)

    }
}
export const clientsPage = new ClientsPage()