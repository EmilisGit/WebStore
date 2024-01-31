import express from "express";
import { StatusCodes } from "http-status-codes";

const server = express();
const port = process.env.PORT || 8080;
server.set("port", port);

// Defining a static file folder
server.use(express.static("public"));

server.get("/", (req, res, next) => {
  res
    .status(StatusCodes.OK)
    .send(JSON.stringify({ message: "Successful response! " }))
    .end();
});
// start the server
server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
