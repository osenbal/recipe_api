import IUser from "@domain/entities/auth/user";

export interface AssignRoleToUserUseCase {
  execute(user: IUser): Promise<boolean>;
}
