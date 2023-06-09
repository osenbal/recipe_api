import IUser, { User } from "@domain/entities/auth/user";
import { UserModel } from "@infrastructure/db/model/users.model";
import { RoleModel } from "@infrastructure/db/model/role.model";
import { UserDataSource } from "@data/interfaces/data-sources/user-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import { Transaction } from "sequelize";

export default class MySQLUserDataSource implements UserDataSource {
  private db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async addUser(user: IUser, t?: Transaction): Promise<UserModel> {
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
    const result = await this.db.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: RoleModel,
          as: "role",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
    });
    return result;
  }

  async getUserWithRoleByEmail(email: string): Promise<any | null> {
    const result = await this.db.findOne({
      where: { email },
      include: "role",
    });
    return result;
  }

  async updateUser(
    data: User,
    context: { id: number },
    t?: Transaction
  ): Promise<User | null> {
    if (!this.db.updateById) return null;

    const result = await this.db.updateById(context.id, data, t);
    return result;
  }
}
