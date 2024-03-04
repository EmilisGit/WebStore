import fs from "fs/promises";
import { colorizeMethod, colorizeMessage } from "./colorize.mjs";
import { InternalError } from "./ErrorHandling/customErrors.mjs";

class logCollector {
  static LOGGING_LEVEL = {
    ALL: 0,
    DETAILED: 1,
    NORMAL: 2,
    IMPORTANT: 3,
    CRITICAL: 4,
  };

  #globalLevel = logCollector.LOGGING_LEVEL.ALL;
  #loggers;

  static instance = null;
  constructor() {
    if (logCollector.instance == null) {
      logCollector.instance = this;
      this.#loggers = [];
      this.#globalLevel = logCollector.LOGGING_LEVEL.NORMAL;
    }
    return logCollector.instance;
  }

  static log(
    msg,
    logLevel = logCollector.LOGGING_LEVEL.NORMAL,
    color = "grey"
  ) {
    let logger = new logCollector();
    if (logger.#globalLevel > logLevel) {
      return;
    }
    logger.#writeToLog(msg);
    console.log("\n" + colorizeMessage(msg, color));
  }

  static logError(msg) {
    return this.log(msg, logCollector.LOGGING_LEVEL.CRITICAL, "red");
  }

  static logSuccess(msg) {
    return this.log(msg, logCollector.LOGGING_LEVEL.NORMAL, "green");
  }

  createAutoHTTPLogger() {
    return this.createHTTPLogger({ level: logCollector.LOGGING_LEVEL.NORMAL });
  }

  createHTTPLogger(options) {
    const level = options.level || logCollector.LOGGING_LEVEL.NORMAL;
    return (req, res, next) => {
      if (this.#globalLevel > level) {
        return;
      }
      this.#logHTTPRequest(req, res, next);
    };
  }

  #logHTTPRequest(req, res, next) {
    let method = req.method;
    const path = req.path;
    this.#writeToLog([method, path].join(" "));
    method = colorizeMethod(method);
    console.log(method, path);
    next();
  }

  #isLocalEnv() {
    let env = process.env.DB_SSL === false ? true : false;
  }

  #writeToLog(msg) {
    // if application is running live, don't write to log files.
    if (!this.#isLocalEnv()) {
      return;
    }
    const time = new Date().toLocaleTimeString();
    msg += "\n" + time + "  ";
    try {
      // Using regex to replace all occurances of  symbol / with -
      let fileName =
        new Date().toLocaleDateString().replace(/\//g, "-") + ".txt";
      let path = "../logs/" + fileName;
      fs.appendFile(path, msg, { encoding: "utf8" }, (err) => {
        if (err) {
          throw new InternalError("Error writing to log file: " + err.message);
        }
      });
    } catch (err) {
      throw new InternalError(
        "Error finding/creating log file: " + err.message
      );
    }
  }
}

export default logCollector;
