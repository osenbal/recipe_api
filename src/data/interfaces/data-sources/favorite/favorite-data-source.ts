import Favorite from "@domain/entities/recipe/favorite";
import { FavoriteModel } from "@infrastructure/db/model/favorite/favorite.model";
import { Transaction } from "sequelize";

export interface FavoriteDataSource {
  addFavorite(
    favorite: Favorite,
    t?: Transaction
  ): Promise<FavoriteModel | null>;
  deleteFavoriteById(
    recipe_id: number,
    user_id: number,
    t?: Transaction
  ): Promise<boolean>;
  getFavoritesByUserId(user_id: number): Promise<any[] | null>;
}
