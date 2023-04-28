import { Router } from "express";
import { AssignRoleToUserUseCase } from "@domain/interfaces/use-cases/user/assign-role-to-user";
import { GetCurrentProfileUseCase } from "@domain/interfaces/use-cases/user/get-current-profile";
import UserController from "../../infrastructure/controllers/user-controller";
import validateAccessToken from "../../domain/middlewares/validateAccessToken-middleware";
import authorizationMiddleware from "../../domain/middlewares/authorization-middleware";

export default function UserRouter(
  assignRoleToUser: AssignRoleToUserUseCase,
  getCurrentProfile: GetCurrentProfileUseCase
) {
  const router = Router();
  const userController = new UserController(
    assignRoleToUser,
    getCurrentProfile
  );

  router.get(
    "/me/:user_id",
    validateAccessToken,
    authorizationMiddleware,
    userController.getMe()
  );

  // router.patch(
  //   "/assign-role/:user_id",
  //   validateAccessToken,
  //   userController.assignRoleToUserController()
  // );

  return router;
}
