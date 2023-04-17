import Chef from "@domain/entities/user/chef";
import { ChefModel } from "@infrastructure/db/model/chef.model";
import { Transaction } from "sequelize";

export interface ChefDataSource {
  addUserChef(chef: Chef, t?: Transaction): Promise<ChefModel>;
  getUserChefByUserId(user_id: number): Promise<ChefModel | null>;
  getUserChefById(id: number): Promise<ChefModel | null>;
  updateUserChef(data: Chef, t?: Transaction): Promise<boolean>;
}
