import {businessUser} from '../support/helper'

class VendorsPage {
  get createVendorButton() {
    return cy.contains('button', 'Create Vendor')
  }

  get vendorNameInput() {
    return cy.get('[class="ant-drawer-content-wrapper"] [id="name"]')
  }

  get createButton() {
    return cy.get('[class="ant-drawer-content-wrapper"] [class="ant-btn ant-btn-primary"]')
  }

  createNewVendorApi(
    name: string,
    phone: string,
    email: string,
    description: string,
    token: string
  ) {
    return cy
      .request({
        method: 'POST',
        url: businessUser.apiUrl + '/vendor',
        headers: {
          Authorization: token,
        },
        body: {
          name,
          phone,
          email,
          description,
        },
      })
      .then(response => {
        expect(response.body.payload).a('string')
      })
      .then(cy.wrap<any>)
  }
}
export const vendorsPage = new VendorsPage()
