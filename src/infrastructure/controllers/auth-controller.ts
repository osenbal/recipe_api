// Path: src/infrastructure/controllers/auth-controller.ts
import { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "@domain/interfaces/use-cases/user/register-user";
import { RefreshTokenUseCase } from "@domain/interfaces/use-cases/user/refresh-token";
import { LoginUserUseCase } from "@domain/interfaces/use-cases/user/login-user";
import { ResponseObj } from "../../utils/response";

export default class AuthController {
  private registerUser: RegisterUserUseCase;
  private loginUser: LoginUserUseCase;
  private refreshToken: RefreshTokenUseCase;

  constructor(
    registerUser: RegisterUserUseCase,
    loginUser: LoginUserUseCase,
    refreshToken: RefreshTokenUseCase
  ) {
    this.registerUser = registerUser;
    this.loginUser = loginUser;
    this.refreshToken = refreshToken;
  }

  public register(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const typeUser = req.body.type;
        let result = null;

        if (typeUser === 0) {
          result = await this.registerUser.executeRegisterChefUser(req.body);
        } else if (typeUser === 1) {
          result = await this.registerUser.executeRegisterCommonUser(req.body);
        }

        res
          .status(201)
          .send(ResponseObj.created("User registered successfully", result));
      } catch (error) {
        next(error);
      }
    };
  }

  public login(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.loginUser.execute(req.body);
        res
          .status(200)
          .send(ResponseObj.success("User logged in successfully", result));
      } catch (error) {
        next(error);
      }
    };
  }

  public getRefreshToken(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.refreshToken.execute(req.body.userId);
        res
          .status(200)
          .send(ResponseObj.success("Token refreshed successfully", result));
      } catch (error) {
        next(error);
      }
    };
  }
}
