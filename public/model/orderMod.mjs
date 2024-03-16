import { sessionManager, sessionKeys } from "../scripts/sessionManager.mjs";
import { postTo } from "../scripts/utils.mjs";
class Order {
  constructor() {
    this.userId;
    this.productIds;
    this.subscriptionMonths;
    this.cost;
    this.companyId;
    this.companyName;
    this.companyCode;
    this.companyTaxCode;
    this.address;
    this.zipCode;
    this.country;
  }

  async updateOrder() {
    const cart = await postTo("/cart/getCart");
    this.productIds = cart.map((item) => item.id);
    this.cost = cart.cost;
    this.subscriptionMonths = cart.subscriptionMonths;
    sessionManager.setItem(sessionKeys.order, this);
  }
}

export default new Order();
