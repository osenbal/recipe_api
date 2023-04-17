export interface RefreshTokenUseCase {
  execute(userId: number): Promise<any>;
}
