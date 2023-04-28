import { NextFunction, Request, Response } from "express";
import { HTTP401Error } from "../exeptions/error-exeption";

// require midleware vallidateAccessToken
export default async function authorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // get user id from req body
    const userId: number = Number(req.body.userId);
    // get user id from params
    const paramsUserId: number = Number(req.params.user_id);
    // if user id from token and params not same
    if (userId !== paramsUserId) {
      throw new HTTP401Error("You are not authorized to access this endpoint");
    }

    next();
  } catch (error) {
    next(error);
  }
}
