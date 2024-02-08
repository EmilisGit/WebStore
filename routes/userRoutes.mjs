import express, { response } from "express";
import { User, CompanyUser } from "../modules/user.mjs";
import { StatusCodes } from "http-status-codes";
import {
  isEmpty,
  containsIllegalChars,
} from "../modules/ValidateInput/validateInput.mjs";
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
    if (!isEmpty(email) && !containsIllegalChars(email)) {
      users.push([
        email,
        companyName,
        companyCode,
        companyTaxCode,
        country,
        address,
        zipCode,
      ]);
      console.log("New user added");
    }
  } catch (e) {
    logCollector.log(e);
  }

  if (email == "") {
    res.status(StatusCodes.BAD_REQUEST).send("No email provided").end();
  }
  res.status(StatusCodes.OK).end();
});

export default USER_API;
