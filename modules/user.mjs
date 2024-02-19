import dbManager from "./dbManager.mjs";

class User {
  constructor() {
    this.id;
    this.email;
    this.companyName = null;
    this.companyCode = null;
    this.companyTaxCode = null;
    this.country = null;
    this.address = null;
    this.zipCode = null;
  }
  // for orders  "INSERT INTO public.users (email, company_name, company_code, company_tax_code, country, address, zipcode) VALUES ($1, $2, $3, $4, $5, $6, $7);"
  addUser() {
    return dbManager.createUser(this);
  }
}
export default User;
