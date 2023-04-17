import Role from "../entities/auth/role";
import { RoleRepository } from "../interfaces/repositories/role-repository";
import { RoleModel } from "@infrastructure/db/model/role.model";
import { RoleDataSource } from "@data/interfaces/data-sources/role-data-source";

export class RoleRepositoryImpl implements RoleRepository {
  roleDataSource: RoleDataSource;

  constructor(roleDataSource: RoleDataSource) {
    this.roleDataSource = roleDataSource;
  }

  async addRole(role: Role): Promise<boolean> {
    return await this.roleDataSource.addRole(role);
  }

  async getRoleById(id: number): Promise<RoleModel | null> {
    return await this.roleDataSource.getRoleById(id);
  }

  async isRoleExist(role_title: string): Promise<boolean> {
    return await this.roleDataSource.isRoleExist(role_title);
  }
}
