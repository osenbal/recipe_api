export interface DeleteFavoriteUseCase {
  execute(favorite_id: number, user_id: number): Promise<boolean>;
}
