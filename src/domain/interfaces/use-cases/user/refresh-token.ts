export interface RefreshTokenUseCase {
  execute(userId: number, role_id: number): Promise<any>;
}
