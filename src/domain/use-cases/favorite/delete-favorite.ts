import { DeleteFavoriteUseCase } from "@domain/interfaces/use-cases/favorite/delete-favorite";
import { FavoriteRepository } from "@domain/interfaces/repositories/favorite/favorite-repository";

export class DeleteFavoriteUseCaseImpl implements DeleteFavoriteUseCase {
  private favoriteRepository: FavoriteRepository;

  constructor(favoriteRepository: FavoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async execute(favorite_id: number): Promise<boolean> {
    const result = await this.favoriteRepository.deleteFavoriteById(
      favorite_id
    );
    return result;
  }
}
