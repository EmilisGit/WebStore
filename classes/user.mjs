import dbManager from "../modules/dbManager.mjs";

class User {
  constructor() {
    this.id;
    this.email;
  }
  addUser() {
    return dbManager.createUser(this);
  }
}
export default User;
