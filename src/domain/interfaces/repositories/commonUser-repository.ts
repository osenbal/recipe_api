import CommonUser from "@domain/entities/user/commonUser";
import { CommonUserModel } from "@infrastructure/db/model/commonUser.model";
import { Transaction } from "sequelize";

export interface CommonUserRepository {
  addCommonUser(user: CommonUser, t?: Transaction): Promise<CommonUserModel>;
  getCommonUserById(id: number): Promise<CommonUserModel | null>;
  getCommonUserByUserId(user_id: number): Promise<CommonUserModel | null>;
  updateCommonUser(data: CommonUser, t?: Transaction): Promise<boolean>;
}
