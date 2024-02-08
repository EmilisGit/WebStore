const httpCodes = {
  OK: 200,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  Conflict: 409,
  LengthRequired: 411,
  PayloadTooLarge: 413,
  URITooLong: 414,
  Locked: 423,
  TooManyRequests: 429,
  NotAcceptable: 406,
  InternalError: 500,
  NotImplemented: 501,
};
const httpMethods = {
  POST: "POST",
  GET: "GET",
  PATCH: "PATCH",
  DELETE: "DELETE",
  PUT: "PUT",
};

export { httpCodes, httpMethods };
