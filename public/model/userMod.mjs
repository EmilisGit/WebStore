import { postTo } from "../scripts/utils.mjs";
import { sessionManager, sessionKeys } from "../scripts/sessionManager.mjs";
class User {
  constructor() {
    this.id;
    this.email;
    this.confirmed = false;
  }
  async updateUser() {
    try {
      const response = await postTo("/user/get-user");
      if (response.ok) {
        const user = await response.json();
        if (user) {
          this.id = user.id;
          this.email = user.email;
          this.confirmed = user.confirmed;
          sessionManager.setItem(sessionKeys.user, user);
        } else {
          throw new Error("No user found");
        }
      } else {
        sessionManager.setItem(sessionKeys.user, {});
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async getUser() {
    const userInfo = sessionManager.getItem(sessionKeys.user);
    return userInfo;
  }
  async getEmail() {
    const userEmail = sessionManager.getItem(sessionKeys.user).email;
    return userEmail;
  }
}

export default new User();
