import { FavoriteDataSource } from "@data/interfaces/data-sources/favorite/favorite-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import { FavoriteModel } from "@infrastructure/db/model/favorite/favorite.model";
import Favorite from "@domain/entities/recipe/favorite";
import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";
import { Transaction } from "sequelize";
import { ChefModel } from "@infrastructure/db/model/chef.model";
import { UserModel } from "@infrastructure/db/model/users.model";

export default class MySQLFavoriteDataSource implements FavoriteDataSource {
  db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async addFavorite(
    favorite: Favorite,
    t?: Transaction
  ): Promise<FavoriteModel | null> {
    const favoriteFind = await this.db.findOne({
      where: { user_id: favorite.user_id, recipe_id: favorite.recipe_id },
    });

    if (favoriteFind) {
      return null;
    }

    const result = await this.db.create(favorite, t);
    return result;
  }

  async deleteFavoriteById(
    recipe_id: number,
    user_id: number,
    t?: Transaction
  ): Promise<any> {
    if (!this.db.destroyByQuery) throw new Error("Method not implemented");
    console.log(recipe_id, user_id);
    const result = await this.db.destroyByQuery(
      {
        where: { recipe_id, user_id },
      },
      t
    );
    return result;
  }

  async getFavoritesByUserId(user_id: number): Promise<any[] | null> {
    const result = await this.db.findAll({
      where: { user_id },
      include: [
        {
          model: RecipeModel,
          as: "recipe",
          where: { deletedAt: null },
          include: [
            "category",
            "dish",
            {
              model: ChefModel,
              as: "chef",
              where: { deletedAt: null },
              attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
              include: [
                {
                  model: UserModel,
                  as: "user",
                  attributes: {
                    exclude: [
                      "password",
                      "createdAt",
                      "updatedAt",
                      "deletedAt",
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    return result;
  }
}
