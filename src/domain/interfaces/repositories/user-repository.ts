import User from "@domain/entities/auth/user";
import { UserModel } from "@infrastructure/db/model/users.model";
import { Transaction } from "sequelize";

export interface UserRepository {
  registerUser(user: User, t?: Transaction): Promise<UserModel>;
  isEmailExist(email: string): Promise<boolean>;
  getUserByEmail(email: string): Promise<UserModel | null>;
  getUserById(id: number): Promise<UserModel | null>;
  getUserWithRoleByEmail(email: string): Promise<any | null>;
  updateUser(data: User, t?: Transaction): Promise<boolean>;
}
