import { Router } from "express";
import { AssignRoleToUserUseCase } from "@domain/interfaces/use-cases/user/assign-role-to-user";
import UserController from "../../infrastructure/controllers/user-controller";
import validateAccessToken from "../../domain/middlewares/validateAccessToken-middleware";

export default function UserRouter(assignRoleToUser: AssignRoleToUserUseCase) {
  const router = Router();
  const userController = new UserController(assignRoleToUser);

  router.patch(
    "/assign-role/:user_id",
    validateAccessToken,
    userController.assignRoleToUserController()
  );

  return router;
}
