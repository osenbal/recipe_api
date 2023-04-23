import Recipe from "@domain/entities/recipe/recipe";
import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";
import { Transaction } from "sequelize";

export interface RecipeDataSource {
  addRecipe(recipe: Recipe, t?: Transaction): Promise<RecipeModel | null>;
  updateRecipeById(recipe: Recipe): Promise<RecipeModel | null>;
  deleteRecipeById(id: number): Promise<boolean>;
  getRecipeById(id: number): Promise<RecipeModel | null>;

  getRecipes(): Promise<RecipeModel[] | null>;
  getRecipesByCategoryId(category_id: number): Promise<RecipeModel[] | null>;
  getRecipesByDishId(dish_id: number): Promise<RecipeModel[] | null>;
  getRecipesByChefId(chef_id: number): Promise<RecipeModel[] | null>;
}
