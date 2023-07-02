import { RecipeRepository } from "@domain/interfaces/repositories/recipe/recipe-repository";
import IRecipe from "@domain/entities/recipe/recipe";
import { RecipeDataSource } from "@data/interfaces/data-sources/recipe/recipe-data-source";
import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";
import { Transaction } from "sequelize";

export class RecipeRepositoryImpl implements RecipeRepository {
  recipeDataSource: RecipeDataSource;

  constructor(recipeDataSource: RecipeDataSource) {
    this.recipeDataSource = recipeDataSource;
  }

  async addRecipe(
    recipe: IRecipe,
    t?: Transaction
  ): Promise<RecipeModel | null> {
    const result = await this.recipeDataSource.addRecipe(recipe, t);
    return result;
  }

  async deleteRecipeById(id: number): Promise<boolean> {
    const result = await this.recipeDataSource.deleteRecipeById(id);
    return result;
  }

  async hardDeleteRecipeById(id: number, t?: Transaction): Promise<boolean> {
    const result = await this.recipeDataSource.hardDeleteRecipeById(id, t);
    return result;
  }

  async getRecipeById(id: number, user_id?: number): Promise<any | null> {
    const result = await this.recipeDataSource.getRecipeById(id, user_id);
    if (!result) return null;
    return result;
  }

  async getRecipes(user_id?: number): Promise<RecipeModel[] | null> {
    const result = await this.recipeDataSource.getRecipes(user_id);
    return result;
  }

  async getRecipeFilter(
    user_id?: number,
    search?: string | undefined,
    category_id?: number | undefined,
    dish_id?: number | undefined,
    chef_id?: number | undefined,
    filterTime?: string
  ): Promise<RecipeModel[] | null> {
    const result = await this.recipeDataSource.getRecipeFilter(
      user_id,
      search,
      category_id,
      dish_id,
      chef_id,
      filterTime
    );
    return result;
  }

  async updateRecipeById(
    recipe_id: number,
    recipe: IRecipe,
    t?: Transaction
  ): Promise<RecipeModel | null> {
    const result = await this.recipeDataSource.updateRecipeById(
      recipe_id,
      recipe,
      t
    );
    return result;
  }
}
