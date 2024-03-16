import express from "express";
import Order from "../classes/order.mjs";
import logCollector from "../modules/logCollector.mjs";
import { httpCodes } from "../modules/httpCodes.mjs";
import { sanitizeInput } from "../modules/ValidateInput/validateInput.mjs";
import { formOrderLink } from "../modules/paymentService.mjs";
import EmailSender from "../modules/emailer.mjs";

const CHECKOUT_API = express.Router();

CHECKOUT_API.use(express.json());
CHECKOUT_API.post("/", sanitizeInput, storeOrder);

async function storeOrder(req, res, next) {
  try {
    const orderData = req.body;
    let order = new Order(orderData);
    order.userId = req.session.user.id;
    await order.addOrder();
    req.session.orderId = order.id;

    const link = await formOrderLink(order, req.session.user.email);
    EmailSender.sendMail(
      req.session.user.email,
      "Your Stripe checkout is ready.",
      link
    );
    return res.status(httpCodes.OK).end();
  } catch (error) {
    next(error);
  }
}

export default CHECKOUT_API;
