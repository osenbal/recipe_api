import { FavoriteDataSource } from "@data/interfaces/data-sources/favorite/favorite-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import { FavoriteModel } from "@infrastructure/db/model/favorite/favorite.model";
import Favorite from "@domain/entities/recipe/favorite";
import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";
import { Transaction } from "sequelize";

export default class MySQLFavoriteDataSource implements FavoriteDataSource {
  db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async addFavorite(
    favorite: Favorite,
    t?: Transaction
  ): Promise<FavoriteModel | null> {
    const result = await this.db.create(favorite, t);
    return result;
  }

  async deleteFavoriteById(id: number, t?: Transaction): Promise<boolean> {
    if (!this.db.updateById) return false;
    const result = await this.db.updateById(
      id,
      {
        deletedAt: new Date(),
      },
      t
    );
    console.log("statius", result);

    return result[0] == 1 ? true : false;
  }

  async getFavoritesByUserId(user_id: number): Promise<any[] | null> {
    const result = await this.db.findAll({
      where: { user_id },
      include: [
        {
          model: RecipeModel,
          as: "recipe",
          where: { deletedAt: null },
          include: ["category", "dish", "chef"],
        },
      ],
    });
    return result;
  }
}
