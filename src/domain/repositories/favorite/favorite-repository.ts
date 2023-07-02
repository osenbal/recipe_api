import { FavoriteRepository } from "@domain/interfaces/repositories/favorite/favorite-repository";
import { FavoriteDataSource } from "@data/interfaces/data-sources/favorite/favorite-data-source";
import { FavoriteModel } from "@infrastructure/db/model/favorite/favorite.model";
import Favorite from "@domain/entities/recipe/favorite";

export class FavoriteRepositoryImpl implements FavoriteRepository {
  favoriteDataSource: FavoriteDataSource;

  constructor(favoriteDataSource: FavoriteDataSource) {
    this.favoriteDataSource = favoriteDataSource;
  }

  async addFavorite(
    favorite: Favorite,
    t?: any
  ): Promise<FavoriteModel | null> {
    const result = await this.favoriteDataSource.addFavorite(favorite, t);
    return result;
  }

  async deleteFavoriteById(
    id: number,
    user_id: number,
    t?: any
  ): Promise<boolean> {
    const result = await this.favoriteDataSource.deleteFavoriteById(
      id,
      user_id,
      t
    );
    return result;
  }

  async getFavoritesByUserId(user_id: number): Promise<any[] | null> {
    const result = await this.favoriteDataSource.getFavoritesByUserId(user_id);
    return result;
  }
}
