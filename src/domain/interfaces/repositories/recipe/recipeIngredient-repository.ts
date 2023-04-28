import RecipeIngredient from "@domain/entities/recipe/recipe_ingredient";
import { RecipeIngredientModel } from "@infrastructure/db/model/recipe/recipe_ingredient.model";
import { Transaction } from "sequelize";

export interface RecipeIngredientRepository {
  addBulkRecipeIngredient(
    recipeIngredient: RecipeIngredient[],
    t?: Transaction
  ): Promise<RecipeIngredientModel[] | null>;

  updateBulkRecipeIngredient(
    recipeIngredients: RecipeIngredient[],
    t?: Transaction
  ): Promise<RecipeIngredientModel[] | null>;

  deleteRecipeIngredientByRecipeId(
    recipe_id: number,
    t?: Transaction
  ): Promise<boolean>;
}
