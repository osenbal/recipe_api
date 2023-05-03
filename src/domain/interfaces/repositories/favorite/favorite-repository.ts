import Favorite from "@domain/entities/recipe/favorite";
import { FavoriteModel } from "@infrastructure/db/model/favorite/favorite.model";
import { Transaction } from "sequelize";

export interface FavoriteRepository {
  addFavorite(
    favorite: Favorite,
    t?: Transaction
  ): Promise<FavoriteModel | null>;
  deleteFavoriteById(id: number, t?: Transaction): Promise<boolean>;
  getFavoritesByUserId(user_id: number): Promise<any[] | null>;
}
