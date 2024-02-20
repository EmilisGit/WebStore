import dbManager from "../dbManager.mjs";

class User {
  constructor() {
    this.id;
    this.email;
    this.companyId;
  }
  addUser() {
    return dbManager.createUser(this);
  }
}
export default User;
