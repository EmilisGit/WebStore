import errorHandler from "./errorHandling/errorHandler.mjs";
import { httpCodes } from "./httpCodes.mjs";
function authenticate(req, res, next) {
  if (req.session.userId) {
    console.log("User is authenticated");
    next();
  } else {
    return res.status(httpCodes.Unauthorized).end();
  }
}

export default authenticate;
