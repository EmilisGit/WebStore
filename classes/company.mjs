import dbManager from "../modules/dbManager.mjs";

class Company {
  constructor(companyData) {
    this.companyId;
    this.companyName = companyData.companyName;
    this.companyCode = companyData.companyCode;
    this.companyTaxCode = companyData.companyTaxCode;
    this.address = companyData.address;
    this.zipCode = companyData.zipCode;
    this.country = companyData.country;
  }
  addCompany() {
    this.companyId = dbManager.createCompany(this);
    return this.companyId;
  }
}

export default Company;
