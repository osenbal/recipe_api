import { LoginUser } from "./login-user";
import IUser from "../../entities/auth/user";
import { UserRepositoryImpl } from "../../../domain/repositories/user-repository";
import MYSQLDataSources from "../../../data/data-sources/mysql";

const mysqlDataSource = MYSQLDataSources.getInstance();
const userDataSource = mysqlDataSource.getUserDataSource();
const roleDataSource = mysqlDataSource.getRoleDataSource();
const commonUserDataSource = mysqlDataSource.getCommonUserDataSource();

const loginUser = new LoginUser(new UserRepositoryImpl(userDataSource));

describe("USE CASE | Login user", () => {
  // test email not valid
  test("Email not valid", async () => {
    const user = {
      email: "iqbal",
      password: "iqbal123",
    };

    await expect(loginUser.execute(user as IUser)).rejects.toThrow(
      "Invalid email"
    );
  });

  // test email not found
  test("email not found", async () => {
    const user = {
      email: "gasal@gmail.com",
      password: "iqbal123",
    };

    await expect(loginUser.execute(user as IUser)).rejects.toThrow(
      "User not found"
    );
  });

  // test password wrong
  test("password not valid", async () => {
    const user = {
      email: "test_unit@gmail.com",
      password: "ngasal",
    };

    await expect(loginUser.execute(user as IUser)).rejects.toThrow(
      "Invalid password"
    );
  });

  // test login success
  test("login success", async () => {
    const user = {
      email: "test_unit@gmail.com",
      password: "test12345",
    };

    const result = await loginUser.execute(user as IUser);
    expect(result).toHaveProperty("accessToken");
    expect(result).toHaveProperty("refreshToken");
  });
});
