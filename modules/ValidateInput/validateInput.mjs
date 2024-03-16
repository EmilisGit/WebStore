import { BadRequestError } from "../ErrorHandling/customErrors.mjs";
import logCollector from "../logCollector.mjs";
import { httpCodes } from "../httpCodes.mjs";

const ILLEGAL_CHARS = /[\";<>]/;

export function isString(input) {
  if (typeof input !== "string") {
    throw new BadRequestError("Input is not a string.");
  }
  return true;
}

export function isEmpty(input) {
  if (input.trim().length === 0) {
    throw new BadRequestError("Input is empty.");
  }
  return false;
}

export function sanitizeInput(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next();
  }
  if (!ILLEGAL_CHARS.test(Object.values(req.body).join(""))) {
    logCollector.logSuccess("Input does not contain illegal chars.");
    return next();
  } else {
    logCollector.logError("Input contains illegal chars: ", req.body);
    res.status(httpCodes.BadRequest).send('Invalid input (contains ";<></>');
  }
}
