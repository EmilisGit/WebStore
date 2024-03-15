import dbManager from "../modules/dbManager.mjs";

class Order {
  constructor(orderData) {
    this.orderId;
    this.userId = orderData.userId;
    this.productIds = orderData.productIds;
    this.subscriptionMonths = orderData.subscriptionMonths;
    this.cost = orderData.cost;
  }
  addOrder() {
    this.orderId = dbManager.createOrder(this);
    return this.orderId;
  }
}

export default Order;
