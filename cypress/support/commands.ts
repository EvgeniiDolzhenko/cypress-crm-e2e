/// <reference types="cypress" />
// ***********************************************

import {businessUser} from "./helper";

Cypress.Commands.add('deleteClient',(email, password,clientId)=>{
    let token : string
    cy.request({
        method:'POST',
        url:businessUser.apiUrl+'/user/login',
        body:{
            email,
            password,
        }
    }).then((response)=>{
        token = response.body.payload.token
    }) .then(()=>{
        cy.request({
            method:'DELETE',
            url:businessUser.apiUrl+`/client/${clientId}`,
            headers:{
                Authorization:token
            }
        })
    })
})

Cypress.Commands.add('deleteItem',(email, password,endPoint,id)=>{
    let token : string
    cy.request({
        method:'POST',
        url:businessUser.apiUrl+'/user/login',
        body:{
            email,
            password,
        }
    }).then((response)=>{
        token = response.body.payload.token
    }) .then(()=>{
        cy.request({
            method:'DELETE',
            url:businessUser.apiUrl+`/${endPoint}/${id}`,
            headers:{
                Authorization:token
            }
        })
    })
})

