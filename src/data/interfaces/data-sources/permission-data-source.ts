import Permission from "@domain/entities/auth/permission";
import { PermissionModel } from "@infrastructure/db/model/permission.model";

export interface PermissionDataSource {
  addPermission(role: Permission): Promise<boolean>;
  getPermissionById(id: number): Promise<PermissionModel | null>;
  isPermissionExist(role_title: string): Promise<boolean>;
}
