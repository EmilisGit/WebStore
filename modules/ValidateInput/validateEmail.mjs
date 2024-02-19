import logCollector from "../logCollector.mjs";
import { BadRequestError } from "../ErrorHandling/customErrors.mjs";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function isValidEmail(input) {
  if (EMAIL_REGEX.test(input)) {
    return true;
  }
  throw new BadRequestError("Invalid email given.");
}
