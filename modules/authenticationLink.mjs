import jwt from "jsonwebtoken";
import logCollector from "./logCollector.mjs";
import { InternalError } from "./ErrorHandling/customErrors.mjs";

export default function authenticationLink(email) {
  try {
    const token = jwt.sign({ email: email }, process.env.EMAIL_JWT_SECRET, {
      expiresIn: "1h",
    });

    const url = `${process.env.URI}/user/confirm/${token}`;
    logCollector.log(url);
    return url;
  } catch (error) {
    throw new InternalError("Couldn't create a email link. ", error.message);
  }
}
