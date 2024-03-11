const sessionKeys = {
  navbar: "navbarInfo",
  shoppingCart: "shoppingCartItems",
  user: "userInfo",
  orderPrice: "orderPrice",
};

class SessionManager {
  constructor() {}

  getItem(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  setItem(key, value) {
    value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
  }

  removeItem(key) {
    sessionStorage.removeItem(key);
  }
}

const sessionManager = new SessionManager();

export { sessionKeys, sessionManager };
