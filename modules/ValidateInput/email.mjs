import logCollector from "../logCollector.mjs";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function validateEmail(input) {
  try {
    if (EMAIL_REGEX.test(input)) {
      logCollector.log(
        `Email ${input} is valid`,
        logCollector.LOGGING_LEVEL.ALL
      );
      return true;
    }
  } catch (error) {
    logCollector.log(
      `Error: ${error.message}`,
      logCollector.LOGGING_LEVEL.IMPORTANT
    );
  }
  return false;
}
