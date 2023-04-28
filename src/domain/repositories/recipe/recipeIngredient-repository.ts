import RecipeIngredient from "@domain/entities/recipe/recipe_ingredient";
import { RecipeIngredientRepository } from "@domain/interfaces/repositories/recipe/recipeIngredient-repository";
import { RecipeIngredientDataSource } from "@data/interfaces/data-sources/recipe/recipeIngredient-data.source";
import { RecipeIngredientModel } from "@infrastructure/db/model/recipe/recipe_ingredient.model";
import { Transaction } from "sequelize";

export class RecipeIngredientRepositoryImpl
  implements RecipeIngredientRepository
{
  recipeIngredientDataSource: RecipeIngredientDataSource;

  constructor(recipeIngredientDataSource: RecipeIngredientDataSource) {
    this.recipeIngredientDataSource = recipeIngredientDataSource;
  }

  async addBulkRecipeIngredient(
    recipeIngredient: RecipeIngredient[],
    t?: Transaction
  ): Promise<RecipeIngredientModel[] | null> {
    const result =
      await this.recipeIngredientDataSource.addBulkRecipeIngredient(
        recipeIngredient,
        t
      );

    return result;
  }

  async updateBulkRecipeIngredient(
    recipeIngredients: RecipeIngredient[],
    t?: Transaction
  ): Promise<RecipeIngredientModel[] | null> {
    const result =
      await this.recipeIngredientDataSource.updateBulkRecipeIngredient(
        recipeIngredients,
        t
      );

    return result;
  }

  async deleteRecipeIngredientByRecipeId(
    recipe_id: number,
    t?: Transaction
  ): Promise<boolean> {
    const result =
      await this.recipeIngredientDataSource.deleteRecipeIngredientByRecipeId(
        recipe_id,
        t
      );

    return result;
  }
}
