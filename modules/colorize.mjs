import { httpMethods } from "./httpCodes.mjs";
import chalk from "chalk";

let COLORS = {};
COLORS[httpMethods.POST] = chalk.yellowBright;
COLORS[httpMethods.GET] = chalk.green;
COLORS[httpMethods.PATCH] = chalk.yellow;
COLORS[httpMethods.PUT] = chalk.yellow;
COLORS[httpMethods.DELETE] = chalk.magenta;
COLORS.Default = chalk.grey;

const colorizeMethod = function (method) {
  if (method in COLORS) {
    return COLORS[method](method);
  }
  return COLORS.Default(method);
};

const colorizeMessage = function (msg, color) {
  if (typeof chalk[color] === "function") {
    return chalk[color](msg);
  } else {
    console.log("Invalid color: ", color);
  }
};

export { colorizeMethod, colorizeMessage };
