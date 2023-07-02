import { NutritionDataSource } from "@data/interfaces/data-sources/recipe/nutrition-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import Nutrition from "@domain/entities/recipe/nutrition";
import { Transaction } from "sequelize";

export default class MySQLNutritionDataSource implements NutritionDataSource {
  private db: SQLDatabaseWrapper;
  private excludeTimestamps = ["createdAt", "updatedAt", "deletedAt"];

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async addNutrition(
    data: Nutrition,
    t?: Transaction
  ): Promise<Nutrition | null> {
    const result = await this.db.create(data, t);
    return result;
  }

  async deleteNutritionByRecipeId(
    recipe_id: number,
    t?: Transaction
  ): Promise<boolean> {
    if (!this.db.updateById) return false;

    const result = await this.db.updateById(recipe_id, {
      deletedAt: new Date(),
      t,
    });

    return result[0] == 1 ? true : false;
  }

  async updateNutritionByRecipeId(
    recipe_id: number,
    data: Nutrition,
    t?: Transaction
  ): Promise<Nutrition | null> {
    if (!this.db.updateById) return null;
    const result = await this.db.updateById(recipe_id, data, t);
    return result;
  }
}
