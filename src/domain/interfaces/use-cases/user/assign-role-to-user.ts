import User from "@domain/entities/auth/user";

export interface AssignRoleToUserUseCase {
  execute(user: User): Promise<boolean>;
}
