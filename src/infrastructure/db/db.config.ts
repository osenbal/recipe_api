import dotenv from "dotenv";
import { Options } from "sequelize";
dotenv.config();

export const development: Options = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DEV_NAME,
  dialect: process.env.DB_DRIVER as
    | "mysql"
    | "postgres"
    | "sqlite"
    | "mariadb"
    | "mssql",
  timezone: "+07:00",
};

export const test: Options = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_TEST_NAME,
  dialect: process.env.DB_DRIVER as
    | "mysql"
    | "postgres"
    | "sqlite"
    | "mariadb"
    | "mssql",
  timezone: "+07:00",
};

export const production: Options = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_PROD_NAME,
  dialect: process.env.DB_DRIVER as
    | "mysql"
    | "postgres"
    | "sqlite"
    | "mariadb"
    | "mssql",
  timezone: "+07:00",
};
