import Order from "./order.mjs";
class Company extends Order {
  constructor() {
    super();
    this.companyId;
    this.companyName;
    this.companyCode;
    this.companyTaxCode;
    this.address;
    this.zipCode;
    this.country;
  }
  addCompany() {
    return dbManager.createCompany(this);
  }
}

export default Company;
