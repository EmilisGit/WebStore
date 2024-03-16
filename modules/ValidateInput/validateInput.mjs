import { BadRequestError } from "../ErrorHandling/customErrors.mjs";
const ILLEGAL_CHARS = /[\";<>]/;

export function containsIllegalChars(input) {
  if (ILLEGAL_CHARS.test(input)) {
    throw new BadRequestError("Input contains illegal characters.");
  }
  return false;
}

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
