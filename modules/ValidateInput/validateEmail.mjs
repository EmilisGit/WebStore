import logCollector from "../logCollector.mjs";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function isValidEmail(input) {
  if (EMAIL_REGEX.test(input)) {
    return true;
  }
  logCollector.log(`Email ${input} is invalid`);
  throw new Error("Invalid email address.");
}
