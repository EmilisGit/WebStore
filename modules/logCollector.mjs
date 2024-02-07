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
    const path = req.origialUrl;
    const time = new Date().toLocaleDateString();

    method = colorize(method);
    this.#writeToLog([time, "  ", method, path].join("  "));

    next();
  }

  #writeToLog(msg) {
    msg += "\n";
    console.log(msg);

    //fs.appendFile("./logs/log.txt", msg, { encoding: "utf8" }, (err) => {});
  }
}

export default logCollector;
