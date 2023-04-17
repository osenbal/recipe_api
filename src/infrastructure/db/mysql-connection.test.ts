// create test connection to mysql database

// create test connection to mysql database using squelize
import { Sequelize } from "sequelize";
import { development } from "./db.config";
import { config } from "dotenv";
config();

const sequelize = new Sequelize(development);

// authenticate to mysql database

describe("MySQL Connection", () => {
  test("connect", async () => {
    await sequelize.authenticate();
  });

  test("close", async () => {
    await sequelize.close();
  });
});
