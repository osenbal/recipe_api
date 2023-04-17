import { GetRoleUseCase } from "@domain/interfaces/use-cases/role/get-role";
import { RoleRepository } from "@domain/interfaces/repositories/role-repository";
import { RoleModel } from "@infrastructure/db/model/role.model";

export default class GetRole implements GetRoleUseCase {
  roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(id: number): Promise<RoleModel | null> {
    return await this.roleRepository.getRoleById(id);
  }
}
