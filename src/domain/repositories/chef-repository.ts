import { ChefRepository } from "../interfaces/repositories/chef-repository";
import Chef from "../entities/user/chef";
import { ChefDataSource } from "@data/interfaces/data-sources/chef-data-source";
import { ChefModel } from "@infrastructure/db/model/chef.model";
import { Transaction } from "sequelize";

export class ChefRepositoryImpl implements ChefRepository {
  chefDataSource: ChefDataSource;

  constructor(chefDataSource: ChefDataSource) {
    this.chefDataSource = chefDataSource;
  }

  async addChef(chef: Chef, t?: Transaction | undefined): Promise<ChefModel> {
    const result = await this.chefDataSource.addUserChef(chef, t);
    return result;
  }
  async getChefById(id: number): Promise<ChefModel | null> {
    const result = await this.chefDataSource.getUserChefById(id);
    return result;
  }
  getChefByUserId(user_id: number): Promise<ChefModel | null> {
    const result = this.chefDataSource.getUserChefByUserId(user_id);
    return result;
  }
  updateChef(data: Chef, t?: Transaction | undefined): Promise<boolean> {
    const result = this.chefDataSource.updateUserChef(data, t);
    return result;
  }
}
