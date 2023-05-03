import { RecipeRepository } from "@domain/interfaces/repositories/recipe/recipe-repository";
import Recipe from "@domain/entities/recipe/recipe";
import { RecipeDataSource } from "@data/interfaces/data-sources/recipe/recipe-data-source";
import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";
import { Transaction } from "sequelize";

export class RecipeRepositoryImpl implements RecipeRepository {
  recipeDataSource: RecipeDataSource;

  constructor(recipeDataSource: RecipeDataSource) {
    this.recipeDataSource = recipeDataSource;
  }

  async addRecipe(
    recipe: Recipe,
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

  async getRecipeById(id: number): Promise<any | null> {
    const result = await this.recipeDataSource.getRecipeById(id);
    if (!result) return null;
    return result;
  }

  async getRecipes(): Promise<RecipeModel[] | null> {
    const result = await this.recipeDataSource.getRecipes();
    return result;
  }

  async getRecipeFilter(
    search?: string | undefined,
    category_id?: number | undefined,
    dish_id?: number | undefined,
    chef_id?: number | undefined
  ): Promise<RecipeModel[] | null> {
    const result = await this.recipeDataSource.getRecipeFilter(
      search,
      category_id,
      dish_id,
      chef_id
    );
    return result;
  }

  async updateRecipeById(
    recipe_id: number,
    recipe: Recipe,
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
