import { HTTP400Error, HTTP500Error } from "../../exeptions/error-exeption";
import CommonUser from "@domain/entities/user/commonUser";
import { CommonUserRepository } from "@domain/interfaces/repositories/commonUser-repository";
import { AddCommonUserUseCase } from "@domain/interfaces/use-cases/commonUser/addCommonUser";

export class AddCommonUser implements AddCommonUserUseCase {
  commonUserRepository: CommonUserRepository;

  constructor(commonUserRepository: CommonUserRepository) {
    this.commonUserRepository = commonUserRepository;
  }

  async execute(user: CommonUser): Promise<boolean> {
    const result = await this.commonUserRepository.addCommonUser(user);
    return result != null;
  }
}
