import Role from "@domain/entities/auth/role";

export interface AddRoleUseCase {
  execute(role: Role): Promise<boolean>;
}
