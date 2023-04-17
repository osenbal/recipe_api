import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import MySQLUserDataSource from "../mysql/mysql-user-data-source";
import MySQLRoleDataSource from "./mysql-role-data-source";
import MySQLCommonUserDataSource from "./mysql-commonUser-data-source";
import MySQLChefDataSource from "./mysql-chef-data-source";
import MySQLCategoryDataSource from "./recipe/mysql-category-data-source";
import MySQLDishDataSource from "./recipe/mysql-dish-data-source";

import {
  User,
  Role,
  CommonUser,
  Chef,
  Category,
  Dish,
} from "../../../infrastructure/db/model/";
import { Transaction } from "sequelize";

export default class MYSQLDataSources {
  private static instance: MYSQLDataSources;

  private constructor() {}

  public static getInstance(): MYSQLDataSources {
    if (!MYSQLDataSources.instance) {
      MYSQLDataSources.instance = new MYSQLDataSources();
    }
    return MYSQLDataSources.instance;
  }

  public getUserDataSource(): MySQLUserDataSource {
    const userDatabase: SQLDatabaseWrapper = {
      findAll: (query: any) => User.findAll(query),
      findOne: (query: any) => User.findOne(query),
      findPk: (id: number) => User.findByPk(id),
      create: (data: any, t: Transaction) =>
        User.create(data, { transaction: t }),
      update: (id: number, data: object, t: Transaction) =>
        User.update(data, { where: { id }, transaction: t }),
      destroy: (id: number, t: Transaction) =>
        User.destroy({ where: { id }, transaction: t }),
    };
    return new MySQLUserDataSource(userDatabase);
  }

  public getRoleDataSource(): MySQLRoleDataSource {
    const roleDatabase: SQLDatabaseWrapper = {
      findAll: (query: any) => Role.findAll(query),
      findOne: (query: any) => Role.findOne(query),
      findPk: (id: number) => Role.findByPk(id),
      create: (data: any) => Role.create(data),
      update: (id: number, data: object) =>
        Role.update(data, { where: { id } }),
      destroy: (id: number) => Role.destroy({ where: { id } }),
    };

    return new MySQLRoleDataSource(roleDatabase);
  }

  public getCommonUserDataSource(): MySQLCommonUserDataSource {
    const commonUserDatabase: SQLDatabaseWrapper = {
      findAll: (query: any) => CommonUser.findAll(query),
      findOne: (query: any) => CommonUser.findOne(query),
      findPk: (id: number) => CommonUser.findByPk(id),
      create: (data: any, t?: Transaction) =>
        CommonUser.create(data, { transaction: t }),
      update: (id: number, data: object, t?: Transaction) =>
        CommonUser.update(data, { where: { id }, transaction: t }),
      destroy: (id: number, t?: Transaction) =>
        CommonUser.destroy({ where: { id }, transaction: t }),
    };

    return new MySQLCommonUserDataSource(commonUserDatabase);
  }

  public getChefDataSource(): MySQLChefDataSource {
    const chefDatabase: SQLDatabaseWrapper = {
      findAll: (query: any) => Chef.findAll(query),
      findOne: (query: any) => Chef.findOne(query),
      findPk: (id: number) => Chef.findByPk(id),
      create: (data: any, t?: Transaction) =>
        Chef.create(data, { transaction: t }),
      update: (id: number, data: object, t?: Transaction) =>
        Chef.update(data, { where: { id }, transaction: t }),
      destroy: (id: number, t?: Transaction) =>
        Chef.destroy({ where: { id }, transaction: t }),
    };

    return new MySQLChefDataSource(chefDatabase);
  }

  public getCategoryDataSource(): MySQLCategoryDataSource {
    const categoryDatabase: SQLDatabaseWrapper = {
      findAll: (query: any) => Category.findAll(query),
      findOne: (query: any) => Category.findOne(query),
      findPk: (id: number) => Category.findByPk(id),
      create: (data: any, t?: Transaction) =>
        Category.create(data, { transaction: t }),
      update: (id: number, data: object, t?: Transaction) =>
        Category.update(data, { where: { id }, transaction: t }),
      destroy: (id: number, t?: Transaction) =>
        Category.destroy({ where: { id }, transaction: t }),
    };

    return new MySQLCategoryDataSource(categoryDatabase);
  }

  public getDishDataSource(): MySQLDishDataSource {
    const dishDatabase: SQLDatabaseWrapper = {
      findAll: (query: any) => Dish.findAll(query),
      findOne: (query: any) => Dish.findOne(query),
      findPk: (id: number) => Dish.findByPk(id),
      create: (data: any, t?: Transaction) =>
        Dish.create(data, { transaction: t }),
      update: (id: number, data: object, t?: Transaction) =>
        Dish.update(data, { where: { id }, transaction: t }),
      destroy: (id: number, t?: Transaction) =>
        Dish.destroy({ where: { id }, transaction: t }),
    };

    return new MySQLDishDataSource(dishDatabase);
  }
}
