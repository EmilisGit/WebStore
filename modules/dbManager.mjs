import pg from "pg";
import logCollector from "./logCollector.mjs";

// We are using an environment variable to get the db credentials
if (process.env.DB_CONNECTIONSTRING == undefined) {
  throw "No db connection string detected";
}

class dbManager {
  #credentials = {};

  constructor(connectionString) {
    this.#credentials = {
      connectionString,
      ssl: process.env.DB_SSL === "true" ? process.env.DB_SSL : false,
    };
  }

  async connect() {
    try {
      const client = new pg.Client(this.#credentials);
      await client.connect();
      logCollector.log("Connected to db!!! -------- ");
      return client;
    } catch (error) {
      console.error("Error connecting to database:", error);
      throw error;
    }
  }
}
export default new dbManager(process.env.DB_CONNECTIONSTRING);
