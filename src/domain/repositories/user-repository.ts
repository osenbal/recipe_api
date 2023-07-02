import IUser, { User } from "@domain/entities/auth/user";
import { UserDataSource } from "@data/interfaces/data-sources/user-data-source";
import { UserModel } from "@infrastructure/db/model/users.model";
import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import { Transaction } from "sequelize";

export class UserRepositoryImpl implements UserRepository {
  userDataSources: UserDataSource;

  constructor(userDataSources: UserDataSource) {
    this.userDataSources = userDataSources;
  }

  async registerUser(user: IUser, t?: Transaction): Promise<UserModel> {
    const newUser = await this.userDataSources.addUser(user, t);
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

  async updateUser(
    data: User,
    context: { id: number },
    t?: Transaction
  ): Promise<User | null> {
    const foundUser = await this.userDataSources.getUserById(context.id);
    if (!foundUser) {
      return null;
    }

    foundUser.set(data.getProps());
    const updatedUser = await foundUser.save({ transaction: t });

    return updatedUser.toJSON() as User;
  }
}
