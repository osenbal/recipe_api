import { FavoriteModel } from "@infrastructure/db/model/favorite/favorite.model";

export interface AddRecipeToFavoriteUseCase {
  execute(user_id: number, recipe_id: number): Promise<FavoriteModel | null>;
}
