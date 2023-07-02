import { GetCurrentProfileUseCase } from "@domain/interfaces/use-cases/user/get-current-profile";
import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import { ChefRepository } from "@domain/interfaces/repositories/chef-repository";
import { CommonUserRepository } from "@domain/interfaces/repositories/commonUser-repository";
import { HTTP404Error, HTTP500Error } from "@domain/exeptions/error-exeption";

export class GetCurrentUserUseCaseImpl implements GetCurrentProfileUseCase {
  userRepository: UserRepository;
  chefRepository: ChefRepository;
  commonUserRepository: CommonUserRepository;

  constructor(
    userRepository: UserRepository,
    chefRepository: ChefRepository,
    commonUserRepository: CommonUserRepository
  ) {
    this.userRepository = userRepository;
    this.chefRepository = chefRepository;
    this.commonUserRepository = commonUserRepository;
  }

  async executeByUserId(user_id: number): Promise<any> {
    const user = await this.userRepository.getUserById(user_id);

    if (!user) {
      throw new HTTP404Error("User not found");
    }

    if (user.role_id === 2) {
      const chef = await this.chefRepository.getChefByUserId(user_id);
      if (!chef) {
        throw new HTTP404Error("Chef not found");
      }
      return { user: { ...user.dataValues, ...chef.dataValues } };
    } else if (user.role_id === 3) {
      const commonUser = await this.commonUserRepository.getCommonUserByUserId(
        user_id
      );
      if (!commonUser) {
        throw new HTTP404Error("User not found");
      }
      return { user: { ...user.dataValues, ...commonUser.dataValues } };
    }

    throw new HTTP500Error("Internal server error");
  }

  async executeByCommonUserId(commonUser_id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async executeByChefId(chef_id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
