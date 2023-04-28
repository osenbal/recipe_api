import { RolePermissionDataSource } from "@data/interfaces/data-sources/role_permissions-data-source";
import RolePermission from "@domain/entities/auth/role_permission";
import { RolePermissionModel } from "@infrastructure/db/model/role_permission.model";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";

export class RolePermissionDataSourceImpl implements RolePermissionDataSource {
  private db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async addRolePermission(rolePermission: RolePermission): Promise<boolean> {
    const result = await this.db.create(rolePermission);
    return result !== null;
  }

  async getRolePermissionByPermissionId(
    permission_id: number
  ): Promise<RolePermissionModel[]> {
    const result = await this.db.findAll({ where: { permission_id } });
    return result;
  }

  async getRolePermissionByRoleId(
    role_id: number
  ): Promise<RolePermissionModel[]> {
    const result = await this.db.findAll({ where: { role_id } });
    return result;
  }
}
