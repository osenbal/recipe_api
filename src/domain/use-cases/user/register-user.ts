import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import { CommonUserRepository } from "@domain/interfaces/repositories/commonUser-repository";
import { ChefRepository } from "@domain/interfaces/repositories/chef-repository";
import { MySQLTransactionsUtilRepository } from "@domain/interfaces/repositories/utils/mysqlTransaction-util-repository";
import { RegisterUserUseCase } from "@domain/interfaces/use-cases/user/register-user";
import { HTTP400Error, HTTP500Error } from "../../exeptions/error-exeption";
import IUser, {
  User,
  checkRequiredInput,
  checkEmailStringFormat,
  checkPasswordStringFormat,
  hashPassword,
  getNameFromEmail,
} from "../../entities/auth/user";
import { UserRoles } from "../../../constants/index";
import bcrypt from "bcrypt";
import { Chef } from "@domain/entities/user/chef";
import { CommonUser } from "@domain/entities/user/commonUser";

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

  private validateUserInput(user: IUser): void {
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

  public async executeRegisterUser(user: IUser): Promise<boolean> {
    this.validateUserInput(user);

    if (await this.userRepository.isEmailExist(user.email)) {
      throw new HTTP400Error("Email is already taken");
    }
    const newUserObj = User.create(user, null);
    const newUser = await this.userRepository.registerUser(
      newUserObj.getProps()
    );
    return newUser !== null;
  }

  public async executeRegisterCommonUser(user: IUser): Promise<boolean> {
    this.validateUserInput(user);

    if (await this.userRepository.isEmailExist(user.email)) {
      throw new HTTP400Error("Email is already taken");
    }

    const hashedPassword = await hashPassword(bcrypt, user.password);
    if (!hashedPassword) throw new HTTP500Error("Hashing password failed");

    const userObj = User.create(user, null);
    userObj.role_id = UserRoles.UserRolesID.COMMON_USER;
    userObj.password = hashedPassword;

    // create common user object with id = null, and user_id temporary = userObj.id
    // pass value name from email before @
    const commonUserObj = CommonUser.create(
      {
        user_id: userObj.id,
        name: getNameFromEmail(userObj.email),
        profile_url: "",
      },
      null
    );

    const t = await this.mySQLTransactionsUtilRepository.beginTransaction();
    try {
      const newUser = await this.userRepository.registerUser(
        userObj.getProps(),
        t
      );

      commonUserObj.user_id = newUser.dataValues.id;

      await this.commonUserRepository.addCommonUser(
        commonUserObj.getProps(),
        t
      );

      await t.commit();
      return newUser !== null;
    } catch (error) {
      await this.mySQLTransactionsUtilRepository.rollbackTransaction();
      throw error;
    }
  }

  public async executeRegisterChefUser(user: IUser): Promise<boolean> {
    this.validateUserInput(user);

    if (await this.userRepository.isEmailExist(user.email)) {
      throw new HTTP400Error("Email is already taken");
    }

    const hashedPassword = await hashPassword(bcrypt, user.password);
    if (!hashedPassword) throw new HTTP500Error("Hashing password failed");

    // create user object
    const userObj = User.create(user, null);
    userObj.role_id = UserRoles.UserRolesID.CHEF;
    userObj.password = hashedPassword;

    // create chef object with id = null, and user_id temporary = userObj.id
    // pass value name from email before @
    const chefObj = Chef.create(
      {
        user_id: userObj.id,
        name: getNameFromEmail(userObj.email),
        profile_url: "",
      },
      null
    );

    const t = await this.mySQLTransactionsUtilRepository.beginTransaction();
    try {
      const newUser = await this.userRepository.registerUser(
        userObj.getProps(),
        t
      );

      // chamge chefObj.user_id to newUser.id
      chefObj.user_id = newUser.dataValues.id;
      await this.chefRepository.addChef(chefObj.getProps(), t);

      await t.commit();
      return newUser !== null;
    } catch (error) {
      console.log("Transaction Mysql Error ", error);
      await this.mySQLTransactionsUtilRepository.rollbackTransaction();
      throw error;
    }
  }

  public async executeRegisterAdminUser(user: IUser): Promise<boolean> {
    this.validateUserInput(user);

    if (await this.userRepository.isEmailExist(user.email)) {
      throw new HTTP400Error("Email is already taken");
    }

    const hashedPassword = await hashPassword(bcrypt, user.password);
    if (!hashedPassword) throw new HTTP500Error("Hashing password failed");

    const userObj = User.create(user, null);
    userObj.role_id = UserRoles.UserRolesID.ADMIN;
    userObj.password = hashedPassword;

    return (await this.userRepository.registerUser(userObj)) !== null;
  }
}
