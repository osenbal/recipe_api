import Permission from "@domain/entities/auth/permission";
import { PermissionModel } from "@infrastructure/db/model/permission.model";
import { PermissionDataSource } from "@data/interfaces/data-sources/permission-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";

export default class MySQLPermissionDataSource implements PermissionDataSource {
  private db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async addPermission(permission: Permission): Promise<boolean> {
    const result = await this.db.create(permission);
    return result !== null;
  }

  async isPermissionExist(permission_title: string): Promise<boolean> {
    const result = await this.db.findOne({ where: { permission_title } });
    return result !== null;
  }

  async getPermissionById(id: number): Promise<PermissionModel | null> {
    const result = await this.db.findPk(id);
    return result;
  }
}
