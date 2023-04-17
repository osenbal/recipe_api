import User from "@domain/entities/auth/user";
import { UserModel } from "@infrastructure/db/model/users.model";
import { UserDataSource } from "@data/interfaces/data-sources/user-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import { Transaction } from "sequelize";

export default class MySQLUserDataSource implements UserDataSource {
  private db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async register(user: User, t?: Transaction): Promise<UserModel> {
    const result = await this.db.create(user, t);
    return result;
  }

  async isEmailExist(email: string): Promise<boolean> {
    const result = await this.db.findOne({ where: { email } });
    return result !== null;
  }

  async getUserByEmail(email: string): Promise<UserModel | null> {
    const result = await this.db.findOne({ where: { email } });
    return result;
  }

  async getUserById(id: number): Promise<UserModel | null> {
    const result = await this.db.findPk(id);
    return result;
  }

  async getUserWithRoleByEmail(email: string): Promise<any | null> {
    const result = await this.db.findOne({
      where: { email },
      include: "role",
    });
    return result;
  }

  async updateUser(user: User, t?: Transaction): Promise<boolean> {
    const result = await this.db.update(user.id, user, t);
    return result !== null;
  }
}
