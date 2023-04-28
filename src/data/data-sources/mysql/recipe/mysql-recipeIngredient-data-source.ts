import RecipeIngredient from "@domain/entities/recipe/recipe_ingredient";
import { RecipeIngredientModel } from "@infrastructure/db/model/recipe/recipe_ingredient.model";
import { RecipeIngredientDataSource } from "@data/interfaces/data-sources/recipe/recipeIngredient-data.source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import { Transaction } from "sequelize";

export default class MySQLRecipeIngredientDataSource
  implements RecipeIngredientDataSource
{
  private db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async addRecipeIngredient(
    recipeIngredient: RecipeIngredient,
    t?: Transaction
  ): Promise<RecipeIngredientModel | null> {
    const result = await this.db.create(recipeIngredient, t);
    return result;
  }

  async addBulkRecipeIngredient(
    recipeIngredients: RecipeIngredient[],
    t?: Transaction
  ): Promise<RecipeIngredientModel[] | null> {
    if (!this.db.bulkCreate) return null;

    const result = await this.db.bulkCreate(recipeIngredients, t);
    return result;
  }

  async getRecipeIngredientByRecipeId(
    recipe_id: number
  ): Promise<RecipeIngredientModel[] | null> {
    const result = await this.db.findAll({
      where: { recipe_id },
      attributes: {
        exclude: ["RecipeModelId"],
      },
    });
    return result;
  }

  async getAllRecipeIngredient(): Promise<RecipeIngredientModel[] | null> {
    const result = await this.db.findAll({});
    return result;
  }

  async getAllRecipeIngredientByRecipeIds(
    recipe_ids: number[]
  ): Promise<RecipeIngredientModel[] | null> {
    const result = await this.db.findAll({ where: { recipe_id: recipe_ids } });
    return result;
  }

  async deleteRecipeIngredientByRecipeId(
    recipe_id: number,
    t?: Transaction
  ): Promise<boolean> {
    if (!this.db.destroyByQuery) return false;
    const result = await this.db.destroyByQuery({ where: { recipe_id } }, t);
    return result !== null;
  }

  async updateBulkRecipeIngredient(
    recipeIngredients: RecipeIngredient[],
    t?: Transaction
  ): Promise<RecipeIngredientModel[] | null> {
    if (!this.db.bulkUpdate) return null;

    const result = await this.db.bulkUpdate(recipeIngredients, t);
    return result;
  }
}
