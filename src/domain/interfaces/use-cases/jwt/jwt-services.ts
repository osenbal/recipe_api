import JwtPayload from "@domain/entities/auth/jwt-payload";

export interface JwtServiceUseCase {
  createAccessToken(payload: JwtPayload): string;
  createRefreshToken(payload: JwtPayload): string;
  verifyAccessToken(token: string): JwtPayload | boolean;
  verifyRefreshToken(token: string): JwtPayload | boolean;
  decodeAccessToken(token: string): JwtPayload;
  decodeRefreshToken(token: string): JwtPayload;
}
