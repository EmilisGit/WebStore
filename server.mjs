import "dotenv/config";
import express from "express";
import { httpCodes } from "./modules/httpCodes.mjs";
import logCollector from "./modules/logCollector.mjs";
import USER_API from "./routes/userRoutes.mjs";
import errorHandler from "./modules/ErrorHandling/errorHandler.mjs";

const server = express();
const port = process.env.PORT || 8080;
server.set("port", port);
const logger = new logCollector();
server.use(logger.createAutoHTTPLogger());

server.use(express.static("public"));
server.use("/user", USER_API);
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
