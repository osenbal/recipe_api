import Nutrition from "@domain/entities/recipe/nutrition";
import { Transaction } from "sequelize";

export interface NutritionDataSource {
  addNutrition(data: Nutrition, t?: Transaction): Promise<Nutrition | null>;
  deleteNutritionByRecipeId(
    recipe_id: number,
    t?: Transaction
  ): Promise<boolean>;
  updateNutritionByRecipeId(
    recipe_id: number,
    data: Nutrition,
    t?: Transaction
  ): Promise<Nutrition | null>;
}
