import { NextFunction, Request, Response } from "express";
import { HTTP401Error } from "../exeptions/error-exeption";
import { JwtService } from "../use-cases/jwt/jwt-services";

export default async function validateAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // get token from header
    const token = req.headers["authorization"] as string;

    if (!token) {
      throw new HTTP401Error("No token, authorization denied");
    }

    // verify token
    const jwtService = new JwtService();
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    const decoded = jwtService.verifyAccessToken(bearerToken);

    // if token not valid
    if (!decoded) {
      throw new HTTP401Error("Token is not valid");
    }

    req.body.userId = decoded.user_id;
    req.body.roleId = decoded.role_id;

    next();
  } catch (error) {
    next(new HTTP401Error(error.message));
  }
}
