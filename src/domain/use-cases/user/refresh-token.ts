import { RefreshTokenUseCase } from "@domain/interfaces/use-cases/user/refresh-token";
import { JwtService } from "../jwt/jwt-services";

export class RefreshToken implements RefreshTokenUseCase {
  async execute(userId: number, role_id: number): Promise<any> {
    // generate new token
    const jwtService = new JwtService();

    const accessToken = jwtService.createAccessToken({
      user_id: userId,
      role_id,
    });

    const refreshToken = jwtService.createRefreshToken({
      user_id: userId,
      role_id,
    });

    return { token: { accessToken, refreshToken } };
  }
}
