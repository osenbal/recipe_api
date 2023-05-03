import Ingredient from "@domain/entities/recipe/ingredient";
import { IngredientModel } from "@infrastructure/db/model/recipe/ingredient.model";
import { IngredientDataSource } from "@data/interfaces/data-sources/recipe/ingredient-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import { Transaction } from "sequelize";

export default class MySQLIngredientDataSource implements IngredientDataSource {
  private db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async addIngredient(
    ingredient: Ingredient,
    t?: Transaction
  ): Promise<boolean> {
    const result = await this.db.create(ingredient);
    return result !== null;
  }

  async getIngredients(): Promise<IngredientModel[] | null> {
    const result = await this.db.findAll({
      where: { deletedAt: null },
    });
    return result;
  }

  async getIngredientById(id: number): Promise<IngredientModel | null> {
    if (!this.db.findPk) return null;
    const result = await this.db.findPk(id);
    return result;
  }

  async getIngredientByIds(ids: number[]): Promise<IngredientModel[] | null> {
    const result = await this.db.findAll({ where: { id: ids } });
    return result;
  }

  async isIngredientExist(ingredient_title: string): Promise<boolean> {
    const result = await this.db.findOne({ where: { ingredient_title } });
    return result !== null;
  }

  async deleteIngredientById(id: number): Promise<boolean> {
    if (!this.db.destroyById) return false;
    const result = await this.db.destroyById(id);
    return result !== null;
  }
}
