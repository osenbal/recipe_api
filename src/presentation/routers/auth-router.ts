import { Router } from "express";
import { RegisterUserUseCase } from "@domain/interfaces/use-cases/user/register-user";
import { RefreshTokenUseCase } from "@domain/interfaces/use-cases/user/refresh-token";
import { LoginUserUseCase } from "@domain/interfaces/use-cases/user/login-user";
import validateRefreshToken from "../../domain/middlewares/validateRefreshToken-middleware";
import AuthController from "../../infrastructure/controllers/auth-controller";

export default function AuthRouter(
  registerUser: RegisterUserUseCase,
  loginUser: LoginUserUseCase,
  refreshToken: RefreshTokenUseCase
) {
  const router = Router();
  const authController = new AuthController(
    registerUser,
    loginUser,
    refreshToken
  );

  router.post("/user/register", authController.register());
  router.post("/login", authController.login());
  router.get(
    "/refresh-token",
    validateRefreshToken,
    authController.getRefreshToken()
  );

  return router;
}
