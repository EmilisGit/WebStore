import express from "express";
import Order from "../classes/order.mjs";
import Company from "../classes/company.mjs";
import { httpCodes } from "../modules/httpCodes.mjs";
import {
  isEmpty,
  containsIllegalChars,
} from "../modules/ValidateInput/validateInput.mjs";
import logCollector from "../modules/logCollector.mjs";
import authenticate from "../modules/userAuth.mjs";

const CHECKOUT_API = express.Router();
CHECKOUT_API.use(express.json());

CHECKOUT_API.post("/", storeCompany, storeOrder);

async function storeCompany(req, res, next) {
  try {
    if (!containsIllegalChars(Object.values(req.body.company).join(""))) {
      logCollector.logSuccess("Input does not contain illegal characters.");
    }
    const companyData = req.body.company;
    let company = new Company(companyData);
    req.locals.companyId = await company.addCompany();
    logCollector.log("Company id in company middleware: ", req.companyId);
    next();
  } catch (error) {
    next(error);
  }
}

async function storeOrder(req, res, next) {
  try {
    if (!containsIllegalChars(Object.values(req.body.order).join(""))) {
      logCollector.logSuccess("Input does not contain illegal characters.");
    }
    const orderData = req.body.order;
    let order = new Order(orderData);
    order.userId = req.session.userId;
    logCollector.log("Company id in order middleware: ", req.companyId);
    order.companyId = req.locals.companyId;
    req.session.orderId = await order.addOrder();
    return res.status(httpCodes.OK).end();
  } catch (error) {
    next(error);
  }
}

export default CHECKOUT_API;
