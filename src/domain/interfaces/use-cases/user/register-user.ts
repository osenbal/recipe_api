import User from "@domain/entities/auth/user";
import { UserModel } from "@infrastructure/db/model/users.model";

export interface RegisterUserUseCase {
  executeRegisterUser(user: User): Promise<boolean | User | UserModel>;
  executeRegisterCommonUser(user: User): Promise<boolean | User | UserModel>;
  executeRegisterAdminUser(user: User): Promise<boolean | User | UserModel>;
  executeRegisterChefUser(user: User): Promise<boolean | User | UserModel>;
}
