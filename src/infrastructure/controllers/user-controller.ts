// Path: src/infrastructure/controllers/auth-controller.ts
import { Request, Response, NextFunction } from "express";
import { AssignRoleToUserUseCase } from "@domain/interfaces/use-cases/user/assign-role-to-user";
import { GetCurrentProfileUseCase } from "@domain/interfaces/use-cases/user/get-current-profile";
import { ResponseObj } from "../../utils/response";

export default class UserController {
  private assignRoleToUser: AssignRoleToUserUseCase;
  private getCurrentProfile: GetCurrentProfileUseCase;

  constructor(
    assignRoleToUser: AssignRoleToUserUseCase,
    getCurrentProfile: GetCurrentProfileUseCase
  ) {
    this.assignRoleToUser = assignRoleToUser;
    this.getCurrentProfile = getCurrentProfile;
  }

  public getMe(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user_id: number = Number(req.params.user_id);

        const result = await this.getCurrentProfile.executeByUserId(user_id);
        res.status(200).send(ResponseObj.success("User profile", result));
      } catch (error) {
        next(error);
      }
    };
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
}
