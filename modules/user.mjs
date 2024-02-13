import dbManager from "./dbManager.mjs";
import errorHandler from "./ErrorHandler.mjs";

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

  async addUser() {
    try {
      const client = await dbManager.connect();
      await client.query(
        "INSERT INTO public.users (email, company_name, company_code, company_tax_code, country, address, zipcode) VALUES ($1, $2, $3, $4, $5, $6, $7);",
        [
          this.email,
          this.companyName,
          this.companyCode,
          this.companyTaxCode,
          this.country,
          this.address,
          this.zipCode,
        ]
      );
      await client.end();
    } catch (error) {
      console.error(error);
      //errorHandler(error);
      console.log("New user added successfully  ");
      throw error;
    } finally {
      client.end();
    }
  }
}

export default User;
