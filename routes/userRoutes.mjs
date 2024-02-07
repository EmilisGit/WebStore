import express, { response } from "express";
import { User, CompanyUser } from "../modules/user.mjs";
import { StatusCodes } from "http-status-codes";

const USER_API = express.Router();
USER_API.use(express.json());

const users = [];

USER_API.get("/:id", (req, res, next) => {});

USER_API.post("/", (req, res, next) => {
  console.log = req.body;

  if (email == "") {
    res.status(StatusCodes.BAD_REQUEST).send("No email provided").end();
  }
});

export default USER_API;
