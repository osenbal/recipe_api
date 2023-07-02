import IUser from "@domain/entities/auth/user";
import { LoginUserUseCase } from "@domain/interfaces/use-cases/user/login-user";
import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import {
  HTTP403Error,
  HTTP404Error,
} from "../../../domain/exeptions/error-exeption";
import { JwtService } from "../jwt/jwt-services";
import { checkEmailStringFormat } from "../../entities/auth/user";
import bcrypt from "bcrypt";

export class LoginUser implements LoginUserUseCase {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: IUser): Promise<any> {
    // check user exist and validation password user
    if (!checkEmailStringFormat(user.email)) {
      throw new HTTP403Error("Invalid email");
    }

    const userFound = await this.userRepository.getUserWithRoleByEmail(
      user.email
    );

    if (!userFound) throw new HTTP404Error("User not found");

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userFound.password
    );

    if (!isPasswordValid) throw new HTTP403Error("Invalid password");

    const jwtService = new JwtService();
    const tokenObj = {
      accessToken: jwtService.createAccessToken({
        user_id: userFound.id!,
        role_id: userFound.role?.id!,
      }),
      refreshToken: jwtService.createRefreshToken({
        user_id: userFound.id!,
        role_id: userFound.role?.id!,
      }),
    };

    return {
      token: tokenObj,
      role: {
        id: userFound?.role?.id,
        title: userFound?.role?.title,
      },
    };
  }
}
