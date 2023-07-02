// Path: src/infrastructure/controllers/auth-controller.ts
import { Request, Response, NextFunction } from "express";
import { GetCurrentProfileUseCase } from "@domain/interfaces/use-cases/user/get-current-profile";
import { UpdateUserUseCase } from "@domain/interfaces/use-cases/user/update-user";
import { ResponseObj } from "../../utils/response";

export default class UserController {
  private getCurrentProfile: GetCurrentProfileUseCase;
  private updateUser: UpdateUserUseCase;

  constructor(
    getCurrentProfile: GetCurrentProfileUseCase,
    updateUser: UpdateUserUseCase
  ) {
    this.getCurrentProfile = getCurrentProfile;
    this.updateUser = updateUser;
  }

  public getMe(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user_id: number = Number(req.body.userId);

        const result = await this.getCurrentProfile.executeByUserId(user_id);
        res.status(200).send(ResponseObj.success("User profile", result));
      } catch (error) {
        next(error);
      }
    };
  }

  public updateMe(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user_id: number = Number(req.body.userId);

        const result = await this.updateUser.executeUpdateUser(req.body, {
          id: user_id,
        });

        res.status(200).send(ResponseObj.success("Success Update", result));
      } catch (error) {
        next(error);
      }
    };
  }

  // public assignRoleToUserController(): (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => Promise<void> {
  //   return async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       // get params
  //       const user_id = req.params.user_id;
  //       const user = req.body;
  //       user.id = user_id;
  //       const result = await this.assignRoleToUser.execute(user);
  //       res
  //         .status(200)
  //         .send(ResponseObj.success("User now have a role", result));
  //     } catch (error) {
  //       next(error);
  //     }
  //   };
  // }
}
