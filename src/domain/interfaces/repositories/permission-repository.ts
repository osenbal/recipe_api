import Permission from "@domain/entities/auth/permission";
import { PermissionModel } from "@infrastructure/db/model/permission.model";

export interface PermissionRepository {
  addPermission(permission: Permission): Promise<boolean>;
  isPermissionExist(permission_title: string): Promise<boolean>;
  getPermissionById(id: number): Promise<PermissionModel | null>;
}
