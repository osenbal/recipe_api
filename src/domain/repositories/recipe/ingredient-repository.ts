import { IngredientRepository } from "@domain/interfaces/repositories/recipe/ingredient-repository";

import Ingredient from "@domain/entities/recipe/ingredient";

import { IngredientDataSource } from "@data/interfaces/data-sources/recipe/ingredient-data-source";
import { Transaction } from "sequelize";

export class IngredientRepositoryImpl implements IngredientRepository {
  ingredientDataSource: IngredientDataSource;

  constructor(ingredientDataSource: IngredientDataSource) {
    this.ingredientDataSource = ingredientDataSource;
  }

  async addIngredient(
    ingredient: Ingredient,
    t?: Transaction
  ): Promise<boolean> {
    const result = await this.ingredientDataSource.addIngredient(ingredient, t);
    return result;
  }

  async getIngredients(): Promise<any[] | null> {
    const result = await this.ingredientDataSource.getIngredients();
    return result;
  }
}
