import { RoleRepository } from "@domain/interfaces/repositories/role-repository";
import { AddRoleUseCase } from "@domain/interfaces/use-cases/role/add-role";
import Role from "@domain/entities/auth/role";
import { HTTP400Error, HTTP500Error } from "../../exeptions/error-exeption";

export class AddRole implements AddRoleUseCase {
  roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(role: Role): Promise<boolean> {
    // check title role exist or not
    if (await this.roleRepository.isRoleExist(role.title)) {
      throw new HTTP400Error("Role is already taken");
    }

    return await this.roleRepository.addRole(role);
  }
}
