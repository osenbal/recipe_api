import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { development, test, production } from "./db.config";
dotenv.config();

const isDev = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";
const configDB = isDev ? development : isProduction ? production : test;

// connection to database
export const sequelize = new Sequelize(configDB);
