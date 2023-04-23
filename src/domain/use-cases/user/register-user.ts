import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import { CommonUserRepository } from "@domain/interfaces/repositories/commonUser-repository";
import { ChefRepository } from "@domain/interfaces/repositories/chef-repository";
import { MySQLTransactionsUtilRepository } from "@domain/interfaces/repositories/utils/mysqlTransaction-util-repository";
import { RegisterUserUseCase } from "@domain/interfaces/use-cases/user/register-user";
import { HTTP400Error, HTTP500Error } from "../../exeptions/error-exeption";
import User, {
  checkRequiredInput,
  checkEmailStringFormat,
  checkPasswordStringFormat,
  hashPassword,
} from "../../entities/auth/user";
import { getNameFromEmail } from "../../../domain/entities/user/commonUser";
import { UserRoles } from "../../../constants/index";
import bcrypt from "bcrypt";

export class RegisterUser implements RegisterUserUseCase {
  userRepository: UserRepository;
  commonUserRepository: CommonUserRepository;
  chefRepository: ChefRepository;
  mySQLTransactionsUtilRepository: MySQLTransactionsUtilRepository;

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

  private validateUserInput(user: User): void {
    if (!checkRequiredInput(user)) {
      throw new HTTP400Error("Invalid input");
    }

    if (!checkEmailStringFormat(user.email)) {
      throw new HTTP400Error("Invalid email");
    }

    if (!checkPasswordStringFormat(user.password)) {
      throw new HTTP400Error("Invalid password");
    }
  }

  public async executeRegisterUser(user: User): Promise<boolean> {
    this.validateUserInput(user);

    if (await this.userRepository.isEmailExist(user.email)) {
      throw new HTTP400Error("Email is already taken");
    }

    const newUser = await this.userRepository.registerUser(user);
    return newUser !== null;
  }

  public async executeRegisterCommonUser(user: User): Promise<boolean> {
    this.validateUserInput(user);

    if (await this.userRepository.isEmailExist(user.email)) {
      throw new HTTP400Error("Email is already taken");
    }

    user.role_id = UserRoles.UserRolesID.COMMON_USER;

    const hashedPassword = await hashPassword(bcrypt, user.password);
    if (!hashedPassword) throw new HTTP500Error("Hashing password failed");

    user.password = hashedPassword;

    const t = await this.mySQLTransactionsUtilRepository.beginTransaction();
    try {
      const newUser = await this.userRepository.registerUser(user, t);
      await this.commonUserRepository.addCommonUser(
        {
          user_id: newUser.dataValues.id,
          name: getNameFromEmail(user.email),
          profile_url: "",
        },
        t
      );

      await t.commit();
      return newUser !== null;
    } catch (error) {
      await this.mySQLTransactionsUtilRepository.rollbackTransaction();
      throw error;
    }
  }

  public async executeRegisterChefUser(user: User): Promise<boolean> {
    this.validateUserInput(user);

    if (await this.userRepository.isEmailExist(user.email)) {
      throw new HTTP400Error("Email is already taken");
    }

    user.role_id = UserRoles.UserRolesID.CHEF;

    const hashedPassword = await hashPassword(bcrypt, user.password);
    if (!hashedPassword) throw new HTTP500Error("Hashing password failed");

    user.password = hashedPassword;

    const t = await this.mySQLTransactionsUtilRepository.beginTransaction();
    try {
      const newUser = await this.userRepository.registerUser(user, t);
      await this.chefRepository.addChef(
        {
          user_id: newUser.dataValues.id,
          name: getNameFromEmail(user.email),
          profile_url: "",
        },
        t
      );

      await t.commit();
      return newUser !== null;
    } catch (error) {
      console.log("Transaction Mysql Error ", error);
      await this.mySQLTransactionsUtilRepository.rollbackTransaction();
      throw error;
    }
  }

  public async executeRegisterAdminUser(user: User): Promise<boolean> {
    return (await this.userRepository.registerUser(user)) !== null;
  }
}
