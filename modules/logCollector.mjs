import fs from "fs/promises";
import colorize from "./colorize.mjs";

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

  static log(msg, logLevel = logCollector.LOGGING_LEVEL.NORMAL) {
    let logger = logCollector.instance;
    if (logger.#globalLevel > logLevel) {
      return;
    }
    logger.#writeToLog(msg);
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
    const time = new Date().toLocaleDateString();

    method = colorize(method);
    this.#writeToLog([time, "  ", method, path].join("  "));

    next();
  }

  #writeToLog(msg) {
    msg += "\n";
    console.log(msg);

    // Using regex to replace all occurances of  symbol / with -
    let fileName = new Date().toLocaleDateString().replace(/\//g, "-") + ".txt";
    let path = "c:/Projects/WebStore/logs/" + fileName;
    console.log(fileName);
    fs.appendFile(path, msg, { encoding: "utf8" }, (err) => {
      if (err) {
        console.error("Log collection error: ", err);
      }
    });
  }
}

export default logCollector;
