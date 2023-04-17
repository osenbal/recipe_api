import Role from "@domain/entities/auth/role";
import { RoleModel } from "@infrastructure/db/model/role.model";

export interface RoleRepository {
  addRole(role: Role): Promise<boolean>;
  getRoleById(id: number): Promise<RoleModel | null>;
  isRoleExist(role_title: string): Promise<boolean>;
}
