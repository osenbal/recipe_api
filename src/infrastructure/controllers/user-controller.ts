// Path: src/infrastructure/controllers/auth-controller.ts
import { Request, Response, NextFunction } from "express";
import { AssignRoleToUserUseCase } from "@domain/interfaces/use-cases/user/assign-role-to-user";
import { ResponseObj } from "../../utils/response";

export default class UserController {
  private assignRoleToUser: AssignRoleToUserUseCase;

  constructor(assignRoleToUser: AssignRoleToUserUseCase) {
    this.assignRoleToUser = assignRoleToUser;
  }

  public assignRoleToUserController(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // get params
        const user_id = req.params.user_id;
        const user = req.body;
        user.id = user_id;
        const result = await this.assignRoleToUser.execute(user);
        res
          .status(200)
          .send(ResponseObj.success("User now have a role", result));
      } catch (error) {
        next(error);
      }
    };
  }

  public registerUserToCommonUser(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
      } catch (error) {
        next(error);
      }
    };
  }
}
