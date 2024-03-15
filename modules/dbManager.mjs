import pg from "pg";
import fs from "fs";
import logCollector from "./logCollector.mjs";
import { DatabaseError, InternalError } from "./ErrorHandling/customErrors.mjs";
import { log } from "console";

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

  // First store company in the database, then store the order
  // the company id is needed to store the order

  async createOrder(order) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      logCollector.log("Company id: ", req.session.companyId);
      const output = await client.query(
        `INSERT INTO public.orders(
          user_id, subscription_months, cost, company_id, order_product_ids)
          VALUES ($1, $2, $3, $4, $5) RETURNING user_id;`,
        [
          order.userId,
          order.subscribtionMonths,
          order.cost,
          req.session.companyId,
          order.productIds,
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

  async createCompany(company) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      const output = await client.query(
        `INSERT INTO public.companies(
          company_name, company_code, company_tax_code, address, zip_code, country)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING company_id;`,
        [
          company.companyName,
          company.companyCode,
          company.companyTaxCode,
          company.address,
          company.zipCode,
          company.country,
        ]
      );
      if (output.rows.length == 1) {
        company.id = output.rows[0].company_id;
      }
      logCollector.logSuccess(`Company with id ${company.id} created`);
      return company.id;
    } catch (error) {
      throw new DatabaseError(error.code);
    } finally {
      client.end();
    }
  }
}
export default new dbManager(connectionString);
