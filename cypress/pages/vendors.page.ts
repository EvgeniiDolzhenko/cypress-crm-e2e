class VendorsPage{
    get createVendorButton(){
        return cy.contains('button','Create Vendor')
    }

    get vendorNameInput(){
        return cy.get('[class="ant-drawer-content-wrapper"] [id="name"]')
    }

    get createButton(){
        return cy.get('[class="ant-drawer-content-wrapper"] [class="ant-btn ant-btn-primary"]')
    }
}
export const vendorsPage = new VendorsPage();