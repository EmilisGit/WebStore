import express, { response } from "express";
import { User, CompanyUser } from "../modules/user.mjs";
import { httpCodes } from "../modules/httpCodes.mjs";
import {
  isEmpty,
  containsIllegalChars,
} from "../modules/ValidateInput/validateInput.mjs";
import isValidEmail from "../modules/ValidateInput/validateEmail.mjs";
import logCollector from "../modules/logCollector.mjs";

const USER_API = express.Router();
USER_API.use(express.json());

const users = [];

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
  try {
    if (
      !isEmpty(email) &&
      !containsIllegalChars(email) &&
      isValidEmail(email)
    ) {
      users.push([
        email,
        companyName,
        companyCode,
        companyTaxCode,
        country,
        address,
        zipCode,
      ]);
      logCollector.log("New user added");
    } else {
      throw new Error("Invalid input");
    }
  } catch (err) {
    return next(err);
  }
  return res.status(httpCodes.OK).end();
});

export default USER_API;
