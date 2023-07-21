import dotenv from "dotenv";
import JwtPayload from "@domain/entities/auth/jwt-payload";
import { JwtServiceUseCase } from "@domain/interfaces/use-cases/jwt/jwt-services";
import jwt from "jsonwebtoken";

dotenv.config();
export class JwtService implements JwtServiceUseCase {
  private readonly accessTokenKey: string;
  private readonly refreshTokenKey: string;
  private readonly accessTokenExpireTime: string;
  private readonly refreshTokenExpireTime: string;

  constructor() {
    this.accessTokenKey = process.env.ACCESS_TOKEN_KEY!;
    this.refreshTokenKey = process.env.REFRESH_TOKEN_KEY!;
    this.accessTokenExpireTime = process.env.ACCESS_TOKEN_EXPIRE_TIME!;
    this.refreshTokenExpireTime = process.env.REFRESH_TOKEN_EXPIRE_TIME!;
  }

  public createAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.accessTokenKey, {
      expiresIn: this.accessTokenExpireTime,
    });
  }

  public createRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.refreshTokenKey, {
      expiresIn: this.refreshTokenExpireTime,
    });
  }

  public verifyAccessToken(token: string): JwtPayload | boolean {
    try {
      return jwt.verify(token, this.accessTokenKey) as JwtPayload;
    } catch (error) {
      return false;
    }
  }

  public verifyRefreshToken(token: string): JwtPayload | boolean {
    try {
      return jwt.verify(token, this.refreshTokenKey) as JwtPayload;
    } catch (error) {
      return false;
    }
  }

  public decodeAccessToken(token: string): JwtPayload {
    return jwt.decode(token) as JwtPayload;
  }

  public decodeRefreshToken(token: string): JwtPayload {
    return jwt.decode(token) as JwtPayload;
  }
}
