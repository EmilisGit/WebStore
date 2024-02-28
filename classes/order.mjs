import User from "./user.mjs";

class Order extends User {
  constructor() {
    super();
    this.orderId;
    this.userId;
    this.productId;
    this.subscribtionMonths;
    this.cost;
  }
  addOrder() {
    return dbManager.createOrder(this);
  }
}

export default Order;
