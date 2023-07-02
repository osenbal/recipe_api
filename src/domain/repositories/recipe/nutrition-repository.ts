import { NutritionRepository } from "@domain/interfaces/repositories/recipe/nutrition-repository";
import Nutrition from "@domain/entities/recipe/nutrition";
import { Transaction } from "sequelize";
import { NutritionDataSource } from "@data/interfaces/data-sources/recipe/nutrition-data-source";

export class NutritionRepositoryImpl implements NutritionRepository {
  nutritionDataSource: NutritionDataSource;

  constructor(nutritionDataSource: NutritionDataSource) {
    this.nutritionDataSource = nutritionDataSource;
  }

  async addNutrition(
    data: Nutrition,
    t?: Transaction
  ): Promise<Nutrition | null> {
    const result = await this.nutritionDataSource.addNutrition(data, t);
    return result;
  }

  async deleteNutritionByRecipeId(
    recipe_id: number,
    t?: Transaction
  ): Promise<boolean> {
    const result = await this.nutritionDataSource.deleteNutritionByRecipeId(
      recipe_id,
      t
    );
    return result;
  }

  async updateNutritionByRecipeId(
    recipe_id: number,
    data: Nutrition,
    t?: Transaction
  ): Promise<Nutrition | null> {
    const result = await this.nutritionDataSource.updateNutritionByRecipeId(
      recipe_id,
      data,
      t
    );
    return result;
  }
}
