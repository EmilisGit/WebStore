import logCollector from "../logCollector.mjs";
import { httpCodes } from "../httpCodes.mjs";
import * as customError from "./customErrors.mjs";
import errorCodes from "./errorCodes.mjs";

const errorHandler = (error, req, res, next) => {
  logCollector.logError(error.stack);
  if (
    error instanceof TypeError ||
    error instanceof SyntaxError ||
    error instanceof customError.BadRequestError
  ) {
    return res.status(httpCodes.BadRequest).send(error.message);
  }

  if (error instanceof customError.DatabaseError) {
    if (error.code === errorCodes.unique_violation) {
      return res.status(httpCodes.Conflict).send(error.message);
    }
  }
  return res.status(httpCodes.InternalError).send(error.message);
};
export default errorHandler;
