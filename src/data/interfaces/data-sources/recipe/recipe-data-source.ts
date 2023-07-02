import IRecipe from "@domain/entities/recipe/recipe";
import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";
import { Transaction } from "sequelize";

export interface RecipeDataSource {
  addRecipe(recipe: IRecipe, t?: Transaction): Promise<RecipeModel | null>;
  updateRecipeById(
    recipe_id: number,
    recipe: IRecipe,
    t?: Transaction
  ): Promise<RecipeModel | null>;
  deleteRecipeById(id: number, t?: Transaction): Promise<boolean>;
  hardDeleteRecipeById(id: number, t?: Transaction): Promise<boolean>;
  getRecipeById(id: number, user_id?: number): Promise<RecipeModel | null>;

  getRecipes(user_id?: number): Promise<RecipeModel[] | null>;
  getRecipeFilter(
    user_id?: number,
    search?: string,
    category_id?: number,
    dish_id?: number,
    chef_id?: number,
    filterTime?: string
  ): Promise<RecipeModel[] | null>;
  getRecipesByCategoryId(category_id: number): Promise<RecipeModel[] | null>;
  getRecipesByDishId(dish_id: number): Promise<RecipeModel[] | null>;
  getRecipesByChefId(chef_id: number): Promise<RecipeModel[] | null>;
}
