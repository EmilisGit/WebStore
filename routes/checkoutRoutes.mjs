import express from "express";
import Order from "../classes/order.mjs";
import Company from "../classes/company.mjs";
import { httpCodes } from "../modules/httpCodes.mjs";
import {
  isEmpty,
  containsIllegalChars,
} from "../modules/ValidateInput/validateInput.mjs";
import logCollector from "../modules/logCollector.mjs";

const CHECKOUT_API = express.Router();
CHECKOUT_API.use(express.json());

async function storeOrder(req, res, next) {
  try {
    if (!containsIllegalChars(Object.values(req.body.order).join(""))) {
      logCollector.logSuccess("Input does not contain illegal characters.");
    }
    const orderData = req.body.order;
    let order = new Order(orderData);
    order.userId = req.session.userId;
    await order.addOrder();
  } catch (error) {
    next(error);
  }
}

async function storeCompany(req, res, next) {
  try {
    if (!containsIllegalChars(Object.values(req.body.company).join(""))) {
      logCollector.logSuccess("Input does not contain illegal characters.");
    }
    const companyData = req.body.company;
    let company = new Company(companyData);
    await company.addCompany();
  } catch (error) {
    next(error);
  }
}

CHECKOUT_API.post("/", async (req, res, next) => {
  try {
    return res.status(httpCodes.OK).end();
  } catch (error) {
    next(error);
  }
  next();
});

export default CHECKOUT_API;
