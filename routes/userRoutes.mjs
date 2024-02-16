import express from "express";
import User from "../modules/user.mjs";
import { httpCodes } from "../modules/httpCodes.mjs";
import {
  isEmpty,
  containsIllegalChars,
} from "../modules/ValidateInput/validateInput.mjs";
import isValidEmail from "../modules/ValidateInput/validateEmail.mjs";
import logCollector from "../modules/logCollector.mjs";
import e from "express";

const USER_API = express.Router();
USER_API.use(express.json());
USER_API.get("/:id", (req, res, next) => {});
USER_API.post("/", (req, res, next) => {
  const {
    email,
    companyName,
    companyCode,
    companyTaxCode,
    country,
    address,
    zipCode,
  } = req.body;
  // if (!isEmpty(email) && !containsIllegalChars(email) && isValidEmail(email)) {
  let user = new User();
  user.email = email;
  console.log(user.email);
  user.companyName = companyName;
  user.companyCode = companyCode;
  user.companyTaxCode = companyTaxCode;
  user.country = country;
  user.address = address;
  user.zipCode = zipCode;
  user.addUser();
  logCollector.log("Added new email:" + user.email);
  // } else {
  //
  return res.status(httpCodes.OK).end();
});

export default USER_API;
