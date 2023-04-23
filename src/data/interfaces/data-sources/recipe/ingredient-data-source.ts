import Ingredient from "@domain/entities/recipe/ingredient";
import { IngredientModel } from "@infrastructure/db/model/recipe/ingredient.model";
import { Transaction } from "sequelize";

export interface IngredientDataSource {
  addIngredient(ingredient: Ingredient, t?: Transaction): Promise<boolean>;
  getIngredientById(id: number): Promise<IngredientModel | null>;
  getIngredientByIds(ids: number[]): Promise<IngredientModel[] | null>;
  isIngredientExist(ingredient_title: string): Promise<boolean>;
  deleteIngredientById(id: number): Promise<boolean>;
}
