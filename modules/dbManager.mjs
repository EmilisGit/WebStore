import pg from "pg";
import logCollector from "./logCollector.mjs";
import { DatabaseError, InternalError } from "./ErrorHandling/customErrors.mjs";

class dbManager {
  #credentials = {};

  constructor(connectionString) {
    this.#credentials = {
      connectionString,
      ssl: { rejectUnauthorized: false },
    };
  }

  async executeQuery(propertyArray, sqlQuery) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      const output = await client.query(sqlQuery, propertyArray);
      return output.rows;
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
        `INSERT INTO public.all_orders(
          user_id, subscription_months, cost, order_product_ids, company_name, company_code, company_tax_code, address, zip_code, country)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING order_id;`,
        [
          order.userId,
          order.subscribtionMonths,
          order.cost,
          order.productIds,
          order.companyName,
          order.companyCode,
          order.companyTaxCode,
          order.address,
          order.zipCode,
          order.country,
        ]
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

let connectionString =
  process.env.ENVIORMENT == "local"
    ? process.env.DB_CONNECTIONSTRING_LOCAL
    : process.env.DB_CONNECTIONSTRING_PROD;

if (connectionString === undefined) {
  throw new InternalError("No database connection string found.");
}

export default new dbManager(connectionString);
