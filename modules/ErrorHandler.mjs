import logCollector from "./logCollector.mjs";
import { httpCodes } from "./httpCodes.mjs";

const errorHandler = function (error, req, res, next) {
  logCollector.log(error);
  if (error.status === httpCodes.BadRequest) {
    return res.status(httpCodes.BadRequest).send(error.message);
  } else {
    return res.status(httpCodes.InternalError).send(error.message);
  }
};
export default errorHandler;
