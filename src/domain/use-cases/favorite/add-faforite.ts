import { AddRecipeToFavoriteUseCase } from "@domain/interfaces/use-cases/favorite/add-favorite";
import { FavoriteRepository } from "@domain/interfaces/repositories/favorite/favorite-repository";
import { FavoriteModel } from "@infrastructure/db/model/favorite/favorite.model";
import Favorite from "@domain/entities/recipe/favorite";

export class AddRecipeToFavoriteUseCaseImpl
  implements AddRecipeToFavoriteUseCase
{
  constructor(private readonly recipeRepository: FavoriteRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute(
    user_id: number,
    recipe_id: number
  ): Promise<FavoriteModel | null> {
    const newFavorite: Favorite = {
      id: 0,
      user_id: user_id,
      recipe_id: recipe_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const favorite = await this.recipeRepository.addFavorite(newFavorite);
    return favorite;
  }
}
