import Role from "@domain/entities/auth/role";
import { RoleModel } from "@infrastructure/db/model/role.model";
import { RoleDataSource } from "@data/interfaces/data-sources/role-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";

export default class MySQLRoleDataSource implements RoleDataSource {
  private db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async addRole(role: Role): Promise<boolean> {
    const result = await this.db.create(role);
    return result !== null;
  }

  async isRoleExist(role_tile: string): Promise<boolean> {
    const result = await this.db.findOne({ where: { role_tile } });
    return result !== null;
  }

  async getRoleById(id: number): Promise<RoleModel | null> {
    const result = await this.db.findPk(id);
    return result;
  }
}
