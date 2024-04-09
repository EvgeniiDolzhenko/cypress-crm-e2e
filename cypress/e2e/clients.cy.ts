import {businessUser} from '../support/helper'
import {loginPage} from "../pages/login.page";
import {clientsPage} from "../pages/clients.page";
import { faker } from '@faker-js/faker';
const randomName = faker.person.fullName();
const phone = faker.phone.number('##########')

describe('CB-005 Create new client e2e positive',()=>{

    let clientId: string
    before('Api login',()=>{
        loginPage.apiLogin(businessUser.apiUrl,businessUser.email,businessUser.pass)
    })

    beforeEach('Set token',()=>{
        window.localStorage.setItem('token',Cypress.env('token'))
    })

    it('Verify creating new client', function () {
        cy.intercept('**/user/auth').as('login')
        cy.visit('/')
        cy.wait('@login')
        cy.get('[href="/v5/client"]').click()
        cy.intercept('POST','**/client/search').as('search')
        cy.contains('button','Create Client')
            .should('exist')
            .click()
        cy.wait('@search')
        cy.wait(1000)
        clientsPage.clientName.should('exist')
            .type(randomName)
        clientsPage.clientPhone.should('exist')
            .type(phone)
        cy.intercept('POST', '**/client').as('newClient')
        clientsPage.createClientButton.click()
        cy.wait('@newClient').then((newClient)=>{
            clientId = newClient.response.body.payload
            cy.wrap(newClient.response.body.payload).as('clientId')
            cy.contains('td',randomName).should('exist')
            cy.get(`a[href="/v5/client/${clientId}"]`).should('exist')
                .click()
            cy.url().should('contain', clientId)
            cy.contains('tr',phone).should('exist')
        })
    });

    after('delete client',function (){
        let token : string
        const clientId = this.clientId
        cy.request({
            method:'POST',
            url:businessUser.apiUrl+'/user/login',
            body:{
                email:businessUser.email,
                password:businessUser.pass,
            }
        }).then((response)=>{
            token = response.body.payload.token
        }) .then(()=>{
            console.log(token)
            cy.request({
                method:'DELETE',
                url:businessUser.apiUrl+`/client/${clientId}`,
                headers:{
                    Authorization:token
                }
            })
        })
    })
})