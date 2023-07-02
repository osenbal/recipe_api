import { Router } from "express";
import { GetCurrentProfileUseCase } from "@domain/interfaces/use-cases/user/get-current-profile";
import { UpdateUserUseCase } from "@domain/interfaces/use-cases/user/update-user";
import UserController from "../../infrastructure/controllers/user-controller";
import validateAccessToken from "../../domain/middlewares/validateAccessToken-middleware";

export default function UserRouter(
  getCurrentProfile: GetCurrentProfileUseCase,
  updateUser: UpdateUserUseCase
) {
  const router = Router();
  const userController = new UserController(getCurrentProfile, updateUser);

  router.get("/me", validateAccessToken, userController.getMe());

  // router.patch("/me", validateAccessToken, userController.updateMe());
  // router.patch(
  //   "/assign-role/:user_id",
  //   validateAccessToken,
  //   userController.assignRoleToUserController()
  // );

  return router;
}
