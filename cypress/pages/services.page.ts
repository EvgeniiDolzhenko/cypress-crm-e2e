import {businessUser} from '../support/helper'
class ServicesPage {
  get createService() {
    return cy.contains('button', 'Create Service')
  }

  get serviceName() {
    return cy.get('[class="ant-drawer-body"] #name')
  }

  get vendorName() {
    return cy.get('input[class="ant-select-selection-search-input"]')
  }

  get description() {
    return cy.get('#description')
  }

  get vendorPrice() {
    return cy.get('#vendorPrice')
  }

  get clientPrice() {
    return cy.get('#clientPrice')
  }

  get createServiceButton() {
    return cy.get('[class="ant-drawer-wrapper-body"] [class="ant-btn ant-btn-primary"]')
  }

  createNewServiceApi(
    vendorId: string,
    clientPrice: string,
    serviceName: string,
    vendorPrice: string,
    token: string
  ) {
    {
      return cy
        .request({
          method: 'POST',
          url: businessUser.apiUrl + '/service',
          headers: {
            Authorization: token,
          },
          body: {
            clientPrice: clientPrice,
            name: serviceName,
            vendor: vendorId,
            vendorPrice: vendorPrice,
          },
        })
        .then(response => {
          expect(response.body.payload).a('string')
        })
        .then(cy.wrap<any>)
    }
  }
}
export const servicesPage = new ServicesPage()
