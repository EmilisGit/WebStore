import { BadRequestError } from "../ErrorHandling/customErrors.mjs";
const ILLEGAL_CHARS = /[\";<>]/;

export function containsIllegalChars(input) {
  if (ILLEGAL_CHARS.test(input)) {
    throw new BadRequestError("Input contains illegal characters.");
  }
  return false;
}

export function isEmpty(input) {
  if (input.trim().length === 0) {
    throw new BadRequestError("Input is empty.");
  }
  return false;
}

export function isString(input) {
  const inputIsString = typeof input === "string" || input instanceof String;

  if (!inputIsString) {
    let invalidType = typeof input;
    if (input === null) invalidType = "null";
    else if (invalidType === "object") invalidType = input.constructor.name;

    logCollector.log("Input not a string");
    throw new TypeError(`Expected a string but received a ${invalidType}`);
  }
  return true;
}
