import { RegisterUser } from "./register-user";
import IUser from "../../entities/auth/user";
import { UserRepositoryImpl } from "../../../domain/repositories/user-repository";
import { RoleRepositoryImpl } from "../../../domain/repositories/role-repository";
import { ChefRepositoryImpl } from "../../../domain/repositories/chef-repository";
import { CommonUserRepositoryImpl } from "@domain/repositories/commonUser-repository";
import { MySQLTransactionsUtilRepositoryImpl } from "@domain/repositories/utils/mysqlTransaction-util-repository";
import MySQLTransactionsUtil from "@data/data-sources/mysql/utils/mysql-transactions-util";

import MYSQLDataSources from "../../../data/data-sources/mysql";

const mysqlDataSource = MYSQLDataSources.getInstance();
const userDataSource = mysqlDataSource.getUserDataSource();
const roleDataSource = mysqlDataSource.getRoleDataSource();
const commonUserDataSource = mysqlDataSource.getCommonUserDataSource();
const chefDataSource = mysqlDataSource.getChefDataSource();

const registerUser = new RegisterUser(
  new UserRepositoryImpl(userDataSource),
  // new RoleRepositoryImpl(roleDataSource),
  new CommonUserRepositoryImpl(commonUserDataSource),
  new ChefRepositoryImpl(chefDataSource),
  new MySQLTransactionsUtilRepositoryImpl(new MySQLTransactionsUtil())
);

describe("USE CASE | Register user", () => {
  // test email empty
  test("Email empty", async () => {
    const user = {
      email: "",
      password: "iqbal123",
    };

    await expect(
      registerUser.executeRegisterCommonUser(user as IUser)
    ).rejects.toThrow("Invalid input");
  });

  // test password empty
  test("Password empty", async () => {
    const user = {
      email: "test_unit@gmail.com",
      password: "",
    };

    await expect(
      registerUser.executeRegisterCommonUser(user as IUser)
    ).rejects.toThrow("Invalid input");
  });

  // test email and  password empty
  test("Email and password empty", async () => {
    const user = {
      email: "",
      password: "",
    };

    await expect(
      registerUser.executeRegisterCommonUser(user as IUser)
    ).rejects.toThrow("Invalid input");
  });

  // test email not valid
  test("Email not valid", async () => {
    const user = {
      email: "iqbal",
      password: "iqbal123",
    };

    await expect(
      registerUser.executeRegisterCommonUser(user as IUser)
    ).rejects.toThrow("Invalid email");
  });

  // test email already exist
  test("Email already exist", async () => {
    const user = {
      email: "test_unit@gmail.com",
      password: "test12345",
    };

    await expect(
      registerUser.executeRegisterCommonUser(user as IUser)
    ).rejects.toThrow("Email is already taken");
  });

  // test password not valid
  test("Password not valid", async () => {
    const user = {
      email: "test_unit@gmail.com",
      password: "123",
    };

    await expect(
      registerUser.executeRegisterCommonUser(user as IUser)
    ).rejects.toThrow("Invalid password");
  });

  // test register success
  test("Register success", async () => {
    const user = {
      email: "new_test_email@gmail.com",
      password: "test12345",
      role_id: 1,
    };

    const result = await registerUser.executeRegisterCommonUser(user as IUser);
    expect(result).toBeTruthy();
  });
});
