require("dotenv").config();
import {
  User,
  Role,
  Permission,
  RolePermission,
  CommonUser,
  Chef,
  Recipe,
  Category,
  Dish,
  Instruction,
  Ingredient,
  Unit,
  Favorite,
} from "./model";

const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV !== "test";
const isProduction = process.env.NODE_ENV === "production";

const dbInit = () =>
  Promise.all([
    User.sync({ alter: isDev || isTest || isProduction }),
    Role.sync({ alter: isDev || isTest || isProduction }),
    Permission.sync({ alter: isDev || isTest || isProduction }),
    RolePermission.sync({ alter: isDev || isTest || isProduction }),
    CommonUser.sync({ alter: isDev || isTest || isProduction }),
    Chef.sync({ alter: isDev || isTest || isProduction }),

    Recipe.sync({ alter: isDev || isTest || isProduction }),
    Category.sync({ alter: isDev || isTest || isProduction }),
    Dish.sync({ alter: isDev || isTest || isProduction }),
    Instruction.sync({ alter: isDev || isTest || isProduction }),
    Ingredient.sync({ alter: isDev || isTest || isProduction }),
    Unit.sync({ alter: isDev || isTest || isProduction }),
    Favorite.sync({ alter: isDev || isTest || isProduction }),
  ]);

export default dbInit;
