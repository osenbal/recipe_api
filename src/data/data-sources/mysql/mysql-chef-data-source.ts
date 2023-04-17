import Chef from "@domain/entities/user/chef";
import { ChefModel } from "@infrastructure/db/model/chef.model";
import { ChefDataSource } from "@data/interfaces/data-sources/chef-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import { Transaction } from "sequelize";

export default class MySQLChefDataSource implements ChefDataSource {
  private db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }
  async addUserChef(
    chef: Chef,
    t?: Transaction | undefined
  ): Promise<ChefModel> {
    const result = await this.db.create(chef, t);
    return result;
  }
  async getUserChefByUserId(user_id: number): Promise<ChefModel | null> {
    const result = await this.db.findOne({ where: { user_id } });
    return result;
  }
  async getUserChefById(id: number): Promise<ChefModel | null> {
    const result = await this.db.findPk(id);
    return result;
  }
  async updateUserChef(
    data: Chef,
    t?: Transaction | undefined
  ): Promise<boolean> {
    if (!data.id) throw new Error("id is required");

    const rseult = await this.db.update(data.id, data, t);
    return rseult !== null;
  }
}
