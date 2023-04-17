import User from "@domain/entities/auth/user";
import { UserModel } from "@infrastructure/db/model/users.model";
import { Transaction } from "sequelize";
export interface UserDataSource {
  register(user: User, t?: Transaction): Promise<UserModel>;
  isEmailExist(email: string): Promise<boolean>;
  getUserByEmail(email: string): Promise<UserModel | null>;
  getUserById(id: number): Promise<UserModel | null>;
  getUserWithRoleByEmail(email: string): Promise<any | null>;
  updateUser(data: object, t?: Transaction): Promise<boolean>;
}
