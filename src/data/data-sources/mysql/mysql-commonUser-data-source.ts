import CommonUser from "@domain/entities/user/commonUser";
import { CommonUserModel } from "@infrastructure/db/model/commonUser.model";
import { CommonUserDataSource } from "@data/interfaces/data-sources/commonUser-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import { Transaction } from "sequelize";

export default class MySQLCommonUserDataSource implements CommonUserDataSource {
  private db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async addCommonUser(
    commonUser: CommonUser,
    t?: Transaction
  ): Promise<CommonUserModel> {
    const result = await this.db.create(commonUser, t);
    return result;
  }

  async getCommonUserByUserId(
    user_id: number
  ): Promise<CommonUserModel | null> {
    const result = await this.db.findOne({ where: { user_id } });
    return result;
  }

  async getCommonUserById(id: number): Promise<CommonUserModel | null> {
    if (!this.db.findPk) return null;
    const result = await this.db.findPk(id);
    return result;
  }

  async updateCommonUser(data: CommonUser, t?: Transaction): Promise<boolean> {
    if (!data.id) throw new Error("id is required");
    if (!this.db.updateById) return false;
    const result = await this.db.updateById(data.id, data, t);
    return result !== null;
  }
}
