export interface ListFavoriteUseCase {
  executeGetListByUserId(user_id: number): Promise<any[] | null>;
}
