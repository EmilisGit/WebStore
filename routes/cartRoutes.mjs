import express from "express";
import { sanitizeInput } from "../modules/ValidateInput/validateInput.mjs";

const CART_API = express.Router();
CART_API.use(express.json());

CART_API.post("/get-cart", sanitizeInput, getCartInfo);

async function getCartInfo(req, res, next) {
  try {
    const cartItems = req.body;
  } catch (err) {
    console.error(err);
  }
}
