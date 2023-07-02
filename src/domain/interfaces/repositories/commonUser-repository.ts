import ICommonUser, { CommonUser } from "@domain/entities/user/commonUser";
import { CommonUserModel } from "@infrastructure/db/model/commonUser.model";
import { Transaction } from "sequelize";

export interface CommonUserRepository {
  addCommonUser(user: ICommonUser, t?: Transaction): Promise<CommonUserModel>;
  getCommonUserById(id: number): Promise<CommonUserModel | null>;
  getCommonUserByUserId(user_id: number): Promise<CommonUserModel | null>;
  updateCommonUser(
    data: CommonUser,
    context: { user_id: number },
    t?: Transaction
  ): Promise<CommonUser | null>;
}
