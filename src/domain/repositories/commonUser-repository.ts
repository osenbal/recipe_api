import { CommonUserRepository } from "../interfaces/repositories/commonUser-repository";
import CommonUser from "../entities/user/commonUser";
import { CommonUserModel } from "@infrastructure/db/model/commonUser.model";
import { CommonUserDataSource } from "@data/interfaces/data-sources/commonUser-data-source";
import { Transaction } from "sequelize";

export class CommonUserRepositoryImpl implements CommonUserRepository {
  commonUserDataSource: CommonUserDataSource;

  constructor(commonUserDataSource: CommonUserDataSource) {
    this.commonUserDataSource = commonUserDataSource;
  }

  async addCommonUser(
    CommonUser: CommonUser,
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

  async updateCommonUser(data: CommonUser, t?: Transaction): Promise<boolean> {
    const result = await this.commonUserDataSource.updateCommonUser(data, t);
    return result;
  }
}
