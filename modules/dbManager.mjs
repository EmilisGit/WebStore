import pg from "pg";
import logCollector from "./logCollector.mjs";
import { DatabaseError } from "./ErrorHandling/customErrors.mjs";

if (process.env.DB_CONNECTIONSTRING_LIVE == undefined) {
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

  async createUser(user) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      const output = await client.query(
        'INSERT INTO "public"."users"("email") VALUES($1) RETURNING "user_id";',
        [user.email]
      );
      if (output.rows.length == 1) {
        user.id = output.rows[0].user_id;
      }
      logCollector.logSuccess(`User with id ${user.id} created`);
      return user.id;
    } catch (error) {
      throw new DatabaseError(error.code);
    } finally {
      client.end();
    }
  }
}
export default new dbManager(process.env.DB_CONNECTIONSTRING_LOCAL);
