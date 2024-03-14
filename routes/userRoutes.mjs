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
USER_API.get("/confirm/:token", confirmUser);
USER_API.post("/get-user", getUser);

async function getUser(req, res, next) {
  logCollector.log("Getting user from session", req.session.user);
  const user = req.session.user;
  res.json(user);
}

async function processUser(req, res, next) {
  try {
    if (!containsIllegalChars(Object.values(req.body).join(""))) {
      logCollector.logSuccess("Input does not contain illegal characters.");
    }
    const email = req.body.email;

    if (isString(email) && !isEmpty(email) && isValidEmail(email)) {
      let user = new User();
      user.email = email;
      let confirmedUserExists = await user.findConfirmedUser();
      //-------- If user exists and is confirmed ---------
      if (confirmedUserExists == true) {
        logCollector.log(
          "User already exists, checkout link will be sent to email."
        );
        user.id = await user.getId();
        user.confirmed = true;
        // send checkout link
      }
      // -------- If user exists but is not confirmed ---------
      else if (confirmedUserExists === false) {
        logCollector.log(
          "User exists but is not confirmed. Send confirmation email."
        );
        try {
          await EmailSender.sendMail(
            user.email,
            "Confirm email address at Webstore"
          );
          user.id = await user.getId();
        } catch (error) {
          logCollector.log(error);
          return res.status(httpCodes.InternalError).end();
        }
      }
      // -------- If user does not exist ---------
      else {
        logCollector.log(
          "User does not exist, adding user to database. Send confirmation email"
        );
        user.id = await user.addUser();
        await EmailSender.sendMail(
          user.email,
          "Confirm email address at Webstore"
        );
      }
      req.session.user = user;
      req.session.save();
    }
  } catch (error) {
    next(error);
  }
  return res.status(httpCodes.OK).end();
}

async function confirmUser(req, res, next) {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.EMAIL_JWT_SECRET);
    console.log("Decoded email: ", decoded.email);
    const user = new User();
    user.confirmUser(decoded.email);
    res.data = { email: decoded.email, confirmed: true };
    res.redirect(`${process.env.URI}`);
  } catch (error) {
    next(error);
  }
}

export default USER_API;
