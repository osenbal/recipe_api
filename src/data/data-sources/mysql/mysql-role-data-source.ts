import Role from "@domain/entities/auth/role";
import { RoleModel } from "@infrastructure/db/model/role.model";
import { RoleDataSource } from "@data/interfaces/data-sources/role-data-source";
import { PermissionModel } from "@infrastructure/db/model/permission.model";
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
    if (!this.db.findPk) return null;
    const result = await this.db.findPk(id);
    return result;
  }

  async getRoleWithPermissionsById(id: number): Promise<any | null> {
    const result = await this.db.findOne({
      where: { id },
      through: { attributes: [] },
      include: [
        {
          model: PermissionModel,
          as: "permissions",
          through: { attributes: [] },
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
    return result;
  }
}
