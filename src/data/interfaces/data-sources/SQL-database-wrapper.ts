// import User from "@domain/entities/user";
import { Transaction } from "sequelize";
export default interface SQLDatabaseWrapper {
  // sequelize methods interface
  findAll(query: object): Promise<any[]>;
  findOne(query: object): Promise<any>;
  findPk?(id: number): Promise<any>;
  create(data: any, t?: Transaction): any;
  updateById?(id: number, data: object, t?: Transaction): any;
  destroyById?(id: number, t?: Transaction): void;

  destroyByQuery?(query: object, t?: Transaction): void;

  bulkCreate?(data: any[], t?: Transaction): any;
  bulkUpdate?(data: any[], ids: number[], t?: Transaction): any;
  bulkDestroy?(data: any[], query: object, t?: Transaction): any;
}
