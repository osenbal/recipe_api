import Role from "@domain/entities/auth/role";

export interface GetRoleUseCase {
  execute(id: number): Promise<Role | null>;
}
