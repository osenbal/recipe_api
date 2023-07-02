import { CommonUserRepository } from "../interfaces/repositories/commonUser-repository";
import ICommonUser, { CommonUser } from "../entities/user/commonUser";
import { CommonUserModel } from "@infrastructure/db/model/commonUser.model";
import { CommonUserDataSource } from "@data/interfaces/data-sources/commonUser-data-source";
import { Transaction } from "sequelize";

export class CommonUserRepositoryImpl implements CommonUserRepository {
  commonUserDataSource: CommonUserDataSource;

  constructor(commonUserDataSource: CommonUserDataSource) {
    this.commonUserDataSource = commonUserDataSource;
  }

  async addCommonUser(
    CommonUser: ICommonUser,
    t?: Transaction
  ): Promise<CommonUserModel> {
    const result = await this.commonUserDataSource.addCommonUser(CommonUser, t);
    return result;
  }

  async getCommonUserById(id: number): Promise<CommonUserModel | null> {
    const result = await this.commonUserDataSource.getCommonUserByUserId(id);
    return result;
  }

  async getCommonUserByUserId(
    user_id: number
  ): Promise<CommonUserModel | null> {
    const result = await this.commonUserDataSource.getCommonUserByUserId(
      user_id
    );
    return result;
  }

  async updateCommonUser(
    data: CommonUser,
    context: { user_id: number },
    t?: Transaction
  ): Promise<CommonUser | null> {
    const foundCommonUser =
      await this.commonUserDataSource.getCommonUserByUserId(context.user_id);

    if (!foundCommonUser) {
      return null;
    }

    foundCommonUser.set(data.getProps());

    const updatedCommonUser = await foundCommonUser.save({ transaction: t });

    return updatedCommonUser.toJSON() as CommonUser;
  }
}
