import "dotenv/config";
import express from "express";
import { httpCodes } from "./modules/httpCodes.mjs";
import logCollector from "./modules/logCollector.mjs";
import CHECKOUT_API from "./routes/checkoutRoutes.mjs";
import USER_API from "./routes/userRoutes.mjs";
import session from "express-session";
import errorHandler from "./modules/errorHandling/errorHandler.mjs";

const server = express();
const port = process.env.PORT || 8080;
server.set("port", port);
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: "strict" },
  })
);
const logger = new logCollector();
server.use(logger.createAutoHTTPLogger());

server.use(express.static("public"));
server.use("/user", USER_API);
server.use("/checkout", CHECKOUT_API);
server.use(errorHandler);

server.get("/", (req, res, next) => {
  res
    .status(httpCodes.OK)
    .send(JSON.stringify({ message: "Successful response! " }))
    .end();
  next();
});

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
