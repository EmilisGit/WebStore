import express from "express";
import User from "../classes/user.mjs";
import { httpCodes } from "../modules/httpCodes.mjs";
import {
  isEmpty,
  containsIllegalChars,
  isString,
} from "../modules/ValidateInput/validateInput.mjs";
import isValidEmail from "../modules/ValidateInput/validateEmail.mjs";
import logCollector from "../modules/logCollector.mjs";
import EmailSender from "../modules/emailer.mjs";
import jwt from "jsonwebtoken";

const USER_API = express.Router();
USER_API.use(express.json());
USER_API.post("/login", processUser);

async function processUser(req, res, next) {
  try {
    if (!containsIllegalChars(Object.values(req.body).join(""))) {
      logCollector.logSuccess("Input does not contain illegal characters.");
    }
    const email = req.body.email;

    if (isString(email) && !isEmpty(email) && isValidEmail(email)) {
      let user = new User();
      user.email = email;
      req.session.userEmail = user.email;
      let confirmedUserExists = await user.findConfirmedUser();

      if (confirmedUserExists == true) {
        logCollector.log(
          "User already exists, checkout link will be sent to email."
        );
        return res.status(httpCodes.OK).end();
      } else if (confirmedUserExists === false) {
        logCollector.log(
          "User exists but is not confirmed. Send confirmation email."
        );
        try {
          await EmailSender.sendMail(
            user.email,
            "Confirm email address at Webstore"
          );
        } catch (error) {
          logCollector.log(error);
          return res.status(httpCodes.InternalError).end();
        }
      } else {
        logCollector.log(
          "User does not exist, adding user to database. Send confirmation email"
        );
        user.id = await user.addUser();

        await EmailSender.sendMail(
          user.email,
          "Confirm email address at Webstore"
        );
        next();
      }
    }
  } catch (error) {
    next(error);
  }
  return res.status(httpCodes.OK).end();
}

USER_API.get("/confirm/:token", confirmUser);
async function confirmUser(req, res, next) {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.EMAIL_JWT_SECRET);
    console.log("Decoded email: ", decoded.email);
    if (decoded.email === req.session.userEmail) {
      let user = new User();
      user.confirmUser();
      return res.status(httpCodes.OK).end();
    } else {
      return res.status(httpCodes.Unauthorized).end();
    }
  } catch (error) {
    next(error);
  }
}

export default USER_API;
