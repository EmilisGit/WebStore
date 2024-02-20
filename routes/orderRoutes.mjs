import express from "express";
import Order from "../modules/classes/order.mjs";
import { httpCodes } from "../modules/httpCodes.mjs";
import {
  isEmpty,
  containsIllegalChars,
} from "../modules/ValidateInput/validateInput.mjs";
import isValidEmail from "../modules/ValidateInput/validateEmail.mjs";
import logCollector from "../modules/logCollector.mjs";

const ORDER_API = express.Router();
ORDER_API.use(express.json());
ORDER_API.get("/:id", (req, res, next) => {});
ORDER_API.post("/", async (req, res, next) => {
  const { userId, productId, subscribtionMonths, cost } = req.body;
  try {
    if (!containsIllegalChars(Object.values(req.body).join(""))) {
      logCollector.logSuccess("Input does not contain illegal characters.");
    }
    if (!isEmpty(email) && isValidEmail(email)) {
      let order = new Order();
      order.email = email;
      order.companyName = companyName;
      order.companyCode = companyCode;
      order.companyTaxCode = companyTaxCode;
      order.country = country;
      order.address = address;
      order.zipCode = zipCode;
      order.productId = productId;
      order.subscribtionMonths = subscribtionMonths;
      order.cost = cost;
      await order.addOrder();
      return res.status(httpCodes.OK).end();
    }
  } catch (error) {
    next(error);
  }
  next();
});

export default ORDER_API;
