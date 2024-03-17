import express from "express";
import User from "../classes/user.mjs";
import { httpCodes } from "../modules/httpCodes.mjs";
import { isEmpty, isString } from "../modules/ValidateInput/validateInput.mjs";
import isValidEmail from "../modules/ValidateInput/validateEmail.mjs";
import logCollector from "../modules/logCollector.mjs";
import EmailSender from "../modules/emailer.mjs";
import jwt from "jsonwebtoken";
import authenticationLink from "../modules/authenticationLink.mjs";
import { sanitizeInput } from "../modules/ValidateInput/validateInput.mjs";

const USER_API = express.Router();
USER_API.use(express.json());
USER_API.post("/login", sanitizeInput, processUser);
USER_API.get("/confirm/:token", confirmUser);
USER_API.post("/get-user", getUser);

async function getUser(req, res, next) {
  const user = req.session.user;
  if (user == null) {
    res.json({});
  }
  res.json(user);
}

async function processUser(req, res, next) {
  try {
    const user = new User();
    const email = req.body.email;
    if (isString(email) && !isEmpty(email) && isValidEmail(email)) {
      user.email = email;
      let confirmedUserExists = await user.findConfirmedUser();

      //-------- If user exists and is confirmed ---------
      if (confirmedUserExists == true) {
        user.id = await user.getId();
        user.confirmed = true;
        req.session.user = user;
        logCollector.logSuccess(
          `The user already exists: ${req.session.user.email}`
        );
      }
      // -------- If user exists but is not confirmed ---------
      else if (confirmedUserExists === false) {
        logCollector.log(
          "User exists but is not confirmed. Send confirmation email."
        );
        try {
          await EmailSender.sendMail(
            user.email,
            "Confirm email address at Webstore",
            `<a href="${authenticationLink(user.email)}">${authenticationLink(
              user.email
            )}</a>`
          );
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
        try {
          await user.addUser();
          await EmailSender.sendMail(
            user.email,
            "Confirm email address at Webstore",
            `<a href="${authenticationLink(user.email)}">${authenticationLink(
              user.email
            )}</a>`
          );
        } catch (error) {
          logCollector.log(error);
          return res.status(httpCodes.InternalError).end();
        }
      }
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

    const user = new User();
    user.confirmed = await user.confirmUser(decoded.email);
    user.email = decoded.email;
    user.id = await user.getId();
    req.session.user = user;
    res.redirect(`${process.env.URI}`);
  } catch (error) {
    next(error);
  }
}

export default USER_API;
