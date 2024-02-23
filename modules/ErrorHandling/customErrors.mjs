import { httpCodes } from "../httpCodes.mjs";

class BadRequestError extends Error {
  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
    this.statusCode = httpCodes.BadRequest;
  }
}
class UserExists extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = "User already exists";
  }
}
class DatabaseError extends Error {
  constructor(code) {
    super();
    this.name = this.constructor.name;
    this.statusCode = httpCodes.InternalError;
    this.code = code;
  }
}
class InternalError extends Error {
  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
    this.statusCode = httpCodes.InternalError;
  }
}
export { BadRequestError, UserExists, DatabaseError, InternalError };
