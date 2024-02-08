import logCollector from "./logCollector.mjs";
import { httpCodes } from "./httpCodes.mjs";

const errorHandler = function (error, req, res, next) {
  logCollector.log(error);
  return res.status(httpCodes.BadRequest).send(error.message);
};

export default errorHandler;
