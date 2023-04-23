import * as dotenv from "dotenv";
import server from "./server";
import morgan from "morgan";
import { AuthRouter, UserRouter, RecipeRouter } from "./presentation/routers/";

import MYSQLDataSources from "./data/data-sources/mysql";

import HttpExceptionMiddleware from "./domain/middlewares/HttpExeption-middleware";

import { RegisterUser } from "./domain/use-cases/user/register-user";
import { LoginUser } from "./domain/use-cases/user/login-user";
import { RefreshToken } from "./domain/use-cases/user/refresh-token";
import { AssignRoleToUser } from "./domain/use-cases/user/assign-role-to-user";

import { UserRepositoryImpl } from "./domain/repositories/user-repository";
import { RoleRepositoryImpl } from "./domain/repositories/role-repository";
import { ChefRepositoryImpl } from "./domain/repositories/chef-repository";
import { CommonUserRepositoryImpl } from "./domain/repositories/commonUser-repository";
import { IngredientRepositoryImpl } from "@domain/repositories/recipe/ingredient-repository";
import { RecipeIngredientRepositoryImpl } from "@domain/repositories/recipe/recipeIngredient-repository";

import { RecipeRepositoryImpl } from "@domain/repositories/recipe/recipe-repository";
import { ListRecipeUseCaseImpl } from "@domain/use-cases/recipe/list-recipe";
import { DetailRecipeUseCaseImpl } from "@domain/use-cases/recipe/detail-recipe";
import { CreateRecipeUseCaseImpl } from "@domain/use-cases/recipe/create-recipe";

import { MySQLTransactionsUtilRepositoryImpl } from "./domain/repositories/utils/mysqlTransaction-util-repository";

import MySQLTransactionsUtil from "./data/data-sources/mysql/utils/mysql-transactions-util";

import { sequelize } from "./infrastructure/db/sequelize";
import { logger, stream } from "./utils/logger";
import * as Sentry from "@sentry/node";
import SentryInit from "./utils/monitoring/sentry";
import { InstructionRepositryImpl } from "@domain/repositories/recipe/instruction-repository";
// import dbInit from "./infrastructure/db/init";
dotenv.config();

async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

(async () => {
  // const dataSource = await getMongoDS();

  // if you migrate manual dont use dbInit

  await connectToDB();
  // await dbInit();

  const mysqlDataSource = MYSQLDataSources.getInstance();
  const userDataSource = mysqlDataSource.getUserDataSource();
  const commonUserDataSource = mysqlDataSource.getCommonUserDataSource();
  const chefDataSource = mysqlDataSource.getChefDataSource();
  // const roleDataSource = mysqlDataSource.getRoleDataSource();

  const authRouter = AuthRouter(
    new RegisterUser(
      new UserRepositoryImpl(userDataSource),
      new CommonUserRepositoryImpl(commonUserDataSource),
      new ChefRepositoryImpl(chefDataSource),
      new MySQLTransactionsUtilRepositoryImpl(new MySQLTransactionsUtil())
    ),
    new LoginUser(new UserRepositoryImpl(userDataSource)),
    new RefreshToken()
  );

  const userRouter = UserRouter(
    new AssignRoleToUser(new UserRepositoryImpl(userDataSource))
  );

  const recipeRouter = RecipeRouter(
    new ListRecipeUseCaseImpl(
      new RecipeRepositoryImpl(mysqlDataSource.getRecipeDataSource())
    ),
    new DetailRecipeUseCaseImpl(
      new RecipeRepositoryImpl(mysqlDataSource.getRecipeDataSource())
    ),
    new CreateRecipeUseCaseImpl(
      new RecipeRepositoryImpl(mysqlDataSource.getRecipeDataSource()),
      new RecipeIngredientRepositoryImpl(
        mysqlDataSource.getRecipeIngredientDataSource()
      ),
      new InstructionRepositryImpl(mysqlDataSource.getInstructionDataSource()),
      new MySQLTransactionsUtilRepositoryImpl(new MySQLTransactionsUtil())
    )
  );

  // MONITORING SENTRY
  if (process.env.NODE_ENV === "production") {
    SentryInit(Sentry, server, `${process.env.SENTRY_URL}`);
    server.use(Sentry.Handlers.requestHandler());
    server.use(Sentry.Handlers.tracingHandler());
  }

  // middlewares
  server.use(morgan("combined", { stream }));
  // for parsing application/json

  // routes
  server.use("/auth", authRouter);
  server.use("/user", userRouter);
  server.use("/recipe", recipeRouter);

  // The error handler must be before any other error middleware and after all controllers
  if (process.env.NODE_ENV === "production") {
    // MONITORING HANDLE ERROR SENTRY
    server.use(Sentry.Handlers.errorHandler());
  }

  server.use(HttpExceptionMiddleware);

  server.listen(process.env.PORT, () =>
    logger.info(`Server running on port ${process.env.PORT}`)
  );
})();
