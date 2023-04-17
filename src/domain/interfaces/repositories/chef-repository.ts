import Chef from "@domain/entities/user/chef";
import { ChefModel } from "@infrastructure/db/model/chef.model";
import { Transaction } from "sequelize";

export interface ChefRepository {
  addChef(chef: Chef, t?: Transaction): Promise<ChefModel>;
  getChefById(id: number): Promise<ChefModel | null>;
  getChefByUserId(user_id: number): Promise<ChefModel | null>;
  updateChef(data: Chef, t?: Transaction): Promise<boolean>;
}
