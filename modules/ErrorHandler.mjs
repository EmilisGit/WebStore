import logCollector from "./logCollector.mjs";
import { httpCodes } from "./httpCodes.mjs";

const errorHandler = function (error, req, res, next) {
  logCollector.log(error);
  if (error.message === "Received input is empty.") {
    return res.status(httpCodes.BadRequest).send(error.message);
  }
  if (error.message === "Invalid email address.") {
    return res.status(httpCodes.BadRequest).send(error.message);
  }
  if (error instanceof TypeError || error instanceof SyntaxError) {
    return res.status(httpCodes.BadRequest).send(error.message);
  } else {
    return res.status(httpCodes.InternalError).send(error.message);
  }
};
export default errorHandler;
