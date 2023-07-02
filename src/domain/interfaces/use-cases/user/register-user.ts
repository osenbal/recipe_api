import IUser from "@domain/entities/auth/user";
import { UserModel } from "@infrastructure/db/model/users.model";

export interface RegisterUserUseCase {
  executeRegisterUser(user: IUser): Promise<boolean | IUser | UserModel>;
  executeRegisterCommonUser(user: IUser): Promise<boolean | IUser | UserModel>;
  executeRegisterAdminUser(user: IUser): Promise<boolean | IUser | UserModel>;
  executeRegisterChefUser(user: IUser): Promise<boolean | IUser | UserModel>;
}
