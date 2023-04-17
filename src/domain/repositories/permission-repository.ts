import Permission from "../entities/auth/permission";
import { PermissionModel } from "@infrastructure/db/model/permission.model";
import { PermissionDataSource } from "@data/interfaces/data-sources/permission-data-source";
import { PermissionRepository } from "../interfaces/repositories/permission-repository";

export class PermissionRepositoryImpl implements PermissionRepository {
  permissionDataSource: PermissionDataSource;

  constructor(permissionDataSource: PermissionDataSource) {
    this.permissionDataSource = permissionDataSource;
  }

  async addPermission(permission: Permission): Promise<boolean> {
    return await this.permissionDataSource.addPermission(permission);
  }

  async isPermissionExist(permission_title: string): Promise<boolean> {
    return await this.permissionDataSource.isPermissionExist(permission_title);
  }

  async getPermissionById(id: number): Promise<PermissionModel | null> {
    return await this.permissionDataSource.getPermissionById(id);
  }
}
