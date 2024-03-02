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
    return dbManager.createOrder(this);
  }
}

export default Order;
