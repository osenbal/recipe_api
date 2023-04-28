import RolePermission from "@domain/entities/auth/role_permission";
import { RolePermissionModel } from "@infrastructure/db/model/role_permission.model";

export interface RolePermissionDataSource {
  addRolePermission(rolePermission: RolePermission): Promise<boolean>;
  getRolePermissionByPermissionId(
    permission_id: number
  ): Promise<RolePermissionModel[]>;
  getRolePermissionByRoleId(role_id: number): Promise<RolePermissionModel[]>;
}
