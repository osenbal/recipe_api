import { ListFavoriteUseCase } from "@domain/interfaces/use-cases/favorite/list-favorite";
import { FavoriteRepository } from "@domain/interfaces/repositories/favorite/favorite-repository";

export class ListFavoriteUseCaseImpl implements ListFavoriteUseCase {
  constructor(private readonly favoriteRepository: FavoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async executeGetListByUserId(user_id: number): Promise<any[] | null> {
    const result = this.favoriteRepository.getFavoritesByUserId(user_id);
    return result;
  }
}
