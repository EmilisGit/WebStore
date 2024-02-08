import logCollector from "../logCollector.mjs";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function isValidEmail(input) {
  if (EMAIL_REGEX.test(input)) {
    logCollector.log(`Email ${input} is valid`, logCollector.LOGGING_LEVEL.ALL);
    return true;
  }
  return false;
  // throw new Error("Invalid email address");
}
