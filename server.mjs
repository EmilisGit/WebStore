import "dotenv/config";
import express from "express";
import { httpCodes } from "./modules/httpCodes.mjs";
import logCollector from "./modules/logCollector.mjs";
import USER_API from "./routes/userRoutes.mjs";
import errorHandler from "./modules/ErrorHandler.mjs";
import User from "./modules/user.mjs";

const server = express();
const port = process.env.PORT || 8080;
server.set("port", port);
server.use(express.static("public"));

// Server logging
const logger = new logCollector();
server.use(logger.createAutoHTTPLogger());
server.use("/user", USER_API);
server.use(errorHandler);

server.get("/", (req, res, next) => {
  res
    .status(httpCodes.OK)
    .send(JSON.stringify({ message: "Successful response! " }))
    .end();
});

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
