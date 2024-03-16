import { httpCodes } from "./httpCodes.mjs";
function authenticate(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    return res.status(httpCodes.Unauthorized).end();
  }
}

export default authenticate;
