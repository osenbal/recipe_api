import JwtPayload from "@domain/entities/auth/jwt-payload";

export interface JwtServiceUseCase {
  createAccessToken(payload: JwtPayload): string;
  createRefreshToken(payload: JwtPayload): string;
  verifyAccessToken(token: string): JwtPayload;
  verifyRefreshToken(token: string): JwtPayload;
  decodeAccessToken(token: string): JwtPayload;
  decodeRefreshToken(token: string): JwtPayload;
}
