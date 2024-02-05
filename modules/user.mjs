class User {
  constructor() {
    this.id;
    this.email;
  }
}

class CompanyUser extends User {
  constructor() {
    super(email);
    this.companyName;
    this.companyCode;
    this.companyTaxCode;
    this.country;
    this.address;
    this.zipCode;
  }
}

export { User, CompanyUser };
