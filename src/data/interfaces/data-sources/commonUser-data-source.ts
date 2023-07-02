import ICommonUser, { CommonUser } from "@domain/entities/user/commonUser";
import { CommonUserModel } from "@infrastructure/db/model/commonUser.model";
import { Transaction } from "sequelize";

export interface CommonUserDataSource {
  addCommonUser(
    commonUser: ICommonUser,
    t?: Transaction
  ): Promise<CommonUserModel>;
  getCommonUserByUserId(user_id: number): Promise<CommonUserModel | null>;
  getCommonUserById(id: number): Promise<CommonUserModel | null>;
  updateCommonUser(data: CommonUser, t?: Transaction): Promise<boolean>;
}
