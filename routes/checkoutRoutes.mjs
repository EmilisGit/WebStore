import express from "express";
import Order from "../classes/order.mjs";
import { httpCodes } from "../modules/httpCodes.mjs";
import {
  isEmpty,
  containsIllegalChars,
} from "../modules/ValidateInput/validateInput.mjs";
import logCollector from "../modules/logCollector.mjs";
import authenticate from "../modules/userAuth.mjs";

const CHECKOUT_API = express.Router();
CHECKOUT_API.use(express.json());

CHECKOUT_API.post("/", authenticate, storeOrder);

async function storeOrder(req, res, next) {
  try {
    if (!containsIllegalChars(Object.values(req.body).join(""))) {
      logCollector.logSuccess("Input does not contain illegal characters.");
    }
    const orderData = req.body;
    let order = new Order(orderData);
    order.userId = req.session.user.id;
    req.session.orderId = await order.addOrder();
    console.log("Order id in order middleware: ", req.session.orderId);
    return res.status(httpCodes.OK).end();
  } catch (error) {
    next(error);
  }
}

export default CHECKOUT_API;
