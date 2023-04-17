// import User from "@domain/entities/user";
import { Transaction } from "sequelize";
export default interface SQLDatabaseWrapper {
  // sequelize methods interface
  findAll(query: object): Promise<any[]>;
  findOne(query: object): Promise<any>;
  findPk(id: number): Promise<any>;
  create(data: any, t?: Transaction): any;
  update(id: number, data: object, t?: Transaction): void;
  destroy(id: number, t?: Transaction): void;
}
