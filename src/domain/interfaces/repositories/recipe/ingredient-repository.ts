import Ingredient from "@domain/entities/recipe/ingredient";
import { IngredientModel } from "@infrastructure/db/model/recipe/ingredient.model";
import { Transaction } from "sequelize";

export interface IngredientRepository {
  addIngredient(ingredient: Ingredient, t?: Transaction): Promise<boolean>;
}
