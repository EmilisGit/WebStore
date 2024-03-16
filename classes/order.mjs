import dbManager from "../modules/dbManager.mjs";

class Order {
  constructor(orderData) {
    this.orderId;
    this.userId = orderData.userId;
    this.productIds = orderData.productIds;
    this.subscriptionMonths = orderData.subscriptionMonths;
    this.cost = orderData.cost;
    this.companyId;
    this.companyName = orderData.companyName;
    this.companyCode = orderData.companyCode;
    this.companyTaxCode = orderData.companyTaxCode;
    this.address = orderData.address;
    this.zipCode = orderData.zipCode;
    this.country = orderData.country;
  }
  addOrder() {
    this.orderId = dbManager.createOrder(this);
    return this.orderId;
  }
}

export default Order;
