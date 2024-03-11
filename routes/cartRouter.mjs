import express from "express";
import { httpCodes } from "../modules/httpCodes.mjs";

const CART_API = express.Router();
CART_API.use(express.json());

CART_API.post("/", (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    req.session.cart.push(req.body);
    return res.status(httpCodes.OK).json(req.session.cart).end();
  } catch (error) {
    next(error);
  }
  next();
});

export default CART_API;
