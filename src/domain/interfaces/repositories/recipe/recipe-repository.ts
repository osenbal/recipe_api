import Recipe from "@domain/entities/recipe/recipe";
import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";
import { Transaction } from "sequelize";

export interface RecipeRepository {
  getRecipeById(id: number): Promise<RecipeModel | null>;
  getRecipes(): Promise<RecipeModel[] | null>;

  addRecipe(recipe: Recipe, t?: Transaction): Promise<RecipeModel | null>;

  updateRecipeById(recipe: Recipe): Promise<RecipeModel | null>;

  deleteRecipeById(id: number): Promise<boolean>;
}
