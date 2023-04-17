import User from "@domain/entities/auth/user";
import { UserDataSource } from "@data/interfaces/data-sources/user-data-source";
import { UserModel } from "@infrastructure/db/model/users.model";
import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import { Transaction } from "sequelize";

export class UserRepositoryImpl implements UserRepository {
  userDataSources: UserDataSource;

  constructor(userDataSources: UserDataSource) {
    this.userDataSources = userDataSources;
  }

  async registerUser(user: User, t?: Transaction): Promise<UserModel> {
    const newUser = await this.userDataSources.register(user, t);
    return newUser;
  }

  async isEmailExist(email: string): Promise<boolean> {
    return await this.userDataSources.isEmailExist(email);
  }

  async getUserByEmail(email: string): Promise<UserModel | null> {
    return await this.userDataSources.getUserByEmail(email);
  }

  async getUserById(id: number): Promise<UserModel | null> {
    return await this.userDataSources.getUserById(id);
  }

  async getUserWithRoleByEmail(email: string): Promise<any | null> {
    return await this.userDataSources.getUserWithRoleByEmail(email);
  }

  async updateUser(data: User, t?: Transaction): Promise<boolean> {
    return await this.userDataSources.updateUser(data, t);
  }
}
