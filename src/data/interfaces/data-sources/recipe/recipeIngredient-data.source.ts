import RecipeIngredient from "@domain/entities/recipe/recipe_ingredient";
import { RecipeIngredientModel } from "@infrastructure/db/model/recipe/recipe_ingredient.model";
import { Transaction } from "sequelize";

export interface RecipeIngredientDataSource {
  addRecipeIngredient(
    recipeIngredient: RecipeIngredient,
    t?: Transaction
  ): Promise<RecipeIngredientModel | null>;
  addBulkRecipeIngredient(
    recipeIngredients: RecipeIngredient[],
    t?: Transaction
  ): Promise<RecipeIngredientModel[] | null>;

  getAllRecipeIngredient(): Promise<RecipeIngredientModel[] | null>;
  getRecipeIngredientByRecipeId(
    recipe_id: number
  ): Promise<RecipeIngredientModel[] | null>;
  getAllRecipeIngredientByRecipeIds(
    recipe_ids: number[]
  ): Promise<RecipeIngredientModel[] | null>;

  deleteRecipeIngredientByRecipeId(
    recipe_id: number,
    t?: Transaction
  ): Promise<boolean>;

  updateBulkRecipeIngredient(
    recipeIngredients: RecipeIngredient[],
    t?: Transaction
  ): Promise<RecipeIngredientModel[] | null>;
}
