import { postTo } from "../scripts/utils.mjs";
import { sessionManager, sessionKeys } from "../scripts/sessionManager.mjs";
class User {
  constructor() {
    this.id = null;
    this.email = null;
    this.confirmed = null;
  }
  async updateUser() {
    let data = await postTo("/user/get-user");
    this.id = data.id;
    this.email = data.email;
    this.confirmed = data.confirmed;
    console.log(data.id);
    sessionManager.setItem(sessionKeys.user, this);
  }
}

export default new User();
