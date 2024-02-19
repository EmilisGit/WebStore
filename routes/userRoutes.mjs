import express from "express";
import User from "../modules/user.mjs";
import { httpCodes } from "../modules/httpCodes.mjs";
import {
  isEmpty,
  containsIllegalChars,
} from "../modules/ValidateInput/validateInput.mjs";
import isValidEmail from "../modules/ValidateInput/validateEmail.mjs";
import logCollector from "../modules/logCollector.mjs";
import errorHandler from "../modules/ErrorHandling/errorHandler.mjs";
import { BadRequestError } from "../modules/ErrorHandling/customErrors.mjs";

const USER_API = express.Router();
USER_API.use(express.json());
USER_API.get("/:id", (req, res, next) => {});
USER_API.post("/", async (req, res, next) => {
  const {
    email,
    companyName,
    companyCode,
    companyTaxCode,
    country,
    address,
    zipCode,
  } = req.body;
  try {
    if (!containsIllegalChars(Object.values(req.body).join(""))) {
      logCollector.logSuccess("Input does not contain illegal characters.");
    }
    if (!isEmpty(email) && isValidEmail(email)) {
      let user = new User();
      user.email = email;
      user.companyName = companyName;
      user.companyCode = companyCode;
      user.companyTaxCode = companyTaxCode;
      user.country = country;
      user.address = address;
      user.zipCode = zipCode;
      await user.addUser();
      return res.status(httpCodes.OK).end();
    }
  } catch (error) {
    next(error);
  }
});

export default USER_API;
