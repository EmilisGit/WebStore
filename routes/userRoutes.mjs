import express from "express";
import User from "../classes/user.mjs";
import { httpCodes } from "../modules/httpCodes.mjs";
import {
  isEmpty,
  containsIllegalChars,
} from "../modules/ValidateInput/validateInput.mjs";
import isValidEmail from "../modules/ValidateInput/validateEmail.mjs";
import logCollector from "../modules/logCollector.mjs";

const USER_API = express.Router();
USER_API.use(express.json());

USER_API.post("/", async (req, res, next) => {
  const email = req.body.email;
  try {
    if (!containsIllegalChars(Object.values(req.body).join(""))) {
      logCollector.logSuccess("Input does not contain illegal characters.");
    }
    if (!isEmpty(email) && isValidEmail(email)) {
      let user = new User();
      user.email = email;
      req.session.userId = await user.addUser();
      console.log(req.session.userId);
      return res.status(httpCodes.OK).end();
    }
  } catch (error) {
    next(error);
  }
});

export default USER_API;
