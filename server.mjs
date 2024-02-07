import express from "express";
import { StatusCodes } from "http-status-codes";
import logCollector from "./modules/logCollector.mjs";
import USER_API from "./routes/userRoutes.mjs";

const server = express();
const port = process.env.PORT || 8080;
server.set("port", port);
server.use(express.static("public"));

// Server logging
const logger = new logCollector();
server.use(logger.createAutoHTTPLogger());

server.use("/user", USER_API);

server.get("/", (req, res, next) => {
  res
    .status(StatusCodes.OK)
    .send(JSON.stringify({ message: "Successful response! " }))
    .end();
});

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
