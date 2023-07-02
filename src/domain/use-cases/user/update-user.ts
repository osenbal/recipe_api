import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import { CommonUserRepository } from "@domain/interfaces/repositories/commonUser-repository";
import { ChefRepository } from "@domain/interfaces/repositories/chef-repository";
import { UpdateUserUseCase } from "@domain/interfaces/use-cases/user/update-user";
import { MySQLTransactionsUtilRepository } from "@domain/interfaces/repositories/utils/mysqlTransaction-util-repository";
import { User } from "@domain/entities/auth/user";
import ICommonUser, { CommonUser } from "@domain/entities/user/commonUser";
import { Chef } from "@domain/entities/user/chef";

export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
  private readonly userRepository: UserRepository;
  private readonly commonUserRepository: CommonUserRepository;
  private readonly chefRepository: ChefRepository;
  private readonly mySQLTransactionsUtilRepository: MySQLTransactionsUtilRepository;

  constructor(
    userRepository: UserRepository,
    commonUserRepository: CommonUserRepository,
    chefRepository: ChefRepository,
    mySQLTransactionsUtilRepository: MySQLTransactionsUtilRepository
  ) {
    this.userRepository = userRepository;
    this.commonUserRepository = commonUserRepository;
    this.chefRepository = chefRepository;
    this.mySQLTransactionsUtilRepository = mySQLTransactionsUtilRepository;
  }
  executeUpdateChef(
    data: Chef,
    context: { user_id: number }
  ): Promise<Chef | null> {
    throw new Error("Method not implemented.");
  }

  async executeUpdateUser(
    data: User,
    context: { id: number }
  ): Promise<User | null> {
    const foundUser = await this.userRepository.getUserById(context.id);
    if (!foundUser) {
      return null;
    }

    const isEmailExist = await this.userRepository.isEmailExist(data.email);
    if (isEmailExist) {
      throw new Error("Email already exist");
    }

    const t = await this.mySQLTransactionsUtilRepository.beginTransaction();

    try {
      const updatedUser = await this.userRepository.updateUser(
        data,
        context,
        t
      );
      await t.commit();
      return updatedUser;
    } catch (error) {
      await this.mySQLTransactionsUtilRepository.rollbackTransaction();
      throw error;
    }
  }

  async executeUpdateCommonUser(
    data: CommonUser,
    context: { user_id: number }
  ): Promise<CommonUser | null> {
    const foundCommonUser = await this.commonUserRepository.getCommonUserById(
      context.user_id
    );

    if (!foundCommonUser) {
      return null;
    }

    const t = await this.mySQLTransactionsUtilRepository.beginTransaction();

    try {
      const updatedCommonUser =
        await this.commonUserRepository.updateCommonUser(data, context, t);

      await t.commit();
      return updatedCommonUser;
    } catch (error) {
      await this.mySQLTransactionsUtilRepository.rollbackTransaction();
      throw error;
    }
  }
}
