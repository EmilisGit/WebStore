import pg from "pg";
import logCollector from "./logCollector.mjs";
import { DatabaseError, InternalError } from "./ErrorHandling/customErrors.mjs";

let connectionString =
  process.env.ENVIRONMENT === "local"
    ? process.env.DB_CONNECTIONSTRING_LOCAL
    : process.env.DB_CONNECTIONSTRING_PROD;

if (connectionString === undefined) {
  throw new InternalError("No database connection string found.");
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

  async createOrder(order) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      const output = await client.query(
        'INSERT INTO "public.orders" (user_id, company_name, company_code, company_tax_code, country, address, zipcode, order_product_no, subscription_months, cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
        [order.userId, order.productId, order.subscribtionMonths, order.cost]
      );
      if (output.rows.length == 1) {
        order.id = output.rows[0].order_id;
      }
      logCollector.logSuccess(`Order with id ${order.id} created`);
      return order.id;
    } catch (error) {
      throw new DatabaseError(error.code);
    } finally {
      client.end();
    }
  }
}
export default new dbManager(connectionString);
