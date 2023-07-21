import { NextFunction, Request, Response } from "express";
import { JwtService } from "../use-cases/jwt/jwt-services";
import { HTTP401Error } from "../exeptions/error-exeption";
import { JwtPayload } from "jsonwebtoken";

export default async function validateAccessTokenIfExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // get token from header
    const token = req.headers["authorization"] as string;
    if (!token) {
      next();
    } else {
      // verify token
      const jwtService = new JwtService();
      const bearer = token.split(" ");
      const bearerToken = bearer[1];
      const decoded = jwtService.verifyAccessToken(bearerToken) as JwtPayload;

      // if (!decoded || typeof decoded === "boolean") {
      //   res.status(401).json({
      //     status: 401,
      //     message: "Token is not valid",
      //   });

      //   return;
      // }

      req.body.userId = decoded.user_id;
      req.body.roleId = decoded.role_id;

      next();
    }
  } catch (error) {
    throw error;
  }
}
