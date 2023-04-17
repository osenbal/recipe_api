import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import { AssignRoleToUserUseCase } from "@domain/interfaces/use-cases/user/assign-role-to-user";
import { HTTP400Error } from "../../exeptions/error-exeption";
import User from "../../entities/auth/user";

export class AssignRoleToUser implements AssignRoleToUserUseCase {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<boolean> {
    if (!user.role_id) {
      throw new HTTP400Error("role_id is required");
    }

    if (!user.id) {
      throw new HTTP400Error("user_id is required");
    }

    const isRoleExist = await this.userRepository.getUserById(user.id);

    if (isRoleExist?.role_id != null) {
      throw new HTTP400Error("User already have a role");
    }

    const result = await this.userRepository.updateUser(user);
    return result;
  }
}
