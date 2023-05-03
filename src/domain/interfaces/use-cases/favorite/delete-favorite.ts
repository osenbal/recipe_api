export interface DeleteFavoriteUseCase {
  execute(favorite_id: number): Promise<boolean>;
}
