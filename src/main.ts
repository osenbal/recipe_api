import * as dotenv from "dotenv";
import server from "./server";
import morgan from "morgan";
import {
  AuthRouter,
  UserRouter,
  RecipeRouter,
  FavoriteRouter,
} from "./presentation/routers/";

import MYSQLDataSources from "./data/data-sources/mysql";

import HttpExceptionMiddleware from "./domain/middlewares/HttpExeption-middleware";

import { RegisterUser } from "./domain/use-cases/user/register-user";
import { LoginUser } from "./domain/use-cases/user/login-user";
import { RefreshToken } from "./domain/use-cases/user/refresh-token";

import { UserRepositoryImpl } from "./domain/repositories/user-repository";
import { ChefRepositoryImpl } from "./domain/repositories/chef-repository";
import { CommonUserRepositoryImpl } from "./domain/repositories/commonUser-repository";

import { RecipeIngredientRepositoryImpl } from "@domain/repositories/recipe/recipeIngredient-repository";
import { RecipeRepositoryImpl } from "@domain/repositories/recipe/recipe-repository";
import { CategoryRepositoryImpl } from "@domain/repositories/recipe/category-repository";
import { DishRepositoryImpl } from "@domain/repositories/recipe/dish-repository";
import { UnitRepositoryImpl } from "@domain/repositories/recipe/unit-repository";
import { NutritionRepositoryImpl } from "@domain/repositories/recipe/nutrition-repository";
import { IngredientRepositoryImpl } from "@domain/repositories/recipe/ingredient-repository";
import { FavoriteRepositoryImpl } from "@domain/repositories/favorite/favorite-repository";

import { ListRecipeUseCaseImpl } from "@domain/use-cases/recipe/list-recipe";
import { DetailRecipeUseCaseImpl } from "@domain/use-cases/recipe/detail-recipe";
import { CreateRecipeUseCaseImpl } from "@domain/use-cases/recipe/create-recipe";
import { InstructionRepositryImpl } from "@domain/repositories/recipe/instruction-repository";
import { GetCurrentUserUseCaseImpl } from "@domain/use-cases/user/get-current-profile";
import { UpdateRecipeUseCaseImpl } from "@domain/use-cases/recipe/update-recipe";
import { DeleteRecipeUseCaseImpl } from "@domain/use-cases/recipe/delete-recipe";
import { ListCategoryDishUnitUseCaseImpl } from "@domain/use-cases/recipe/list-category-dish-unit";
import { ListIngredientUseCaseImpl } from "@domain/use-cases/recipe/list-ingredient";

import { AddRecipeToFavoriteUseCaseImpl } from "@domain/use-cases/favorite/add-faforite";
import { ListFavoriteUseCaseImpl } from "@domain/use-cases/favorite/list-faorite";
import { DeleteFavoriteUseCaseImpl } from "@domain/use-cases/favorite/delete-favorite";

import { MySQLTransactionsUtilRepositoryImpl } from "./domain/repositories/utils/mysqlTransaction-util-repository";

import MySQLTransactionsUtil from "./data/data-sources/mysql/utils/mysql-transactions-util";

import { sequelize } from "./infrastructure/db/sequelize";
import { logger, stream } from "./utils/logger";
import * as Sentry from "@sentry/node";
import SentryInit from "./utils/monitoring/sentry";
import { UpdateUserUseCaseImpl } from "@domain/use-cases/user/update-user";
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

  // data sources
  const mysqlDataSource = MYSQLDataSources.getInstance();
  const userDataSource = mysqlDataSource.getUserDataSource();
  const commonUserDataSource = mysqlDataSource.getCommonUserDataSource();
  const chefDataSource = mysqlDataSource.getChefDataSource();
  const recipeDataSource = mysqlDataSource.getRecipeDataSource();
  const recipeIngredientDataSource =
    mysqlDataSource.getRecipeIngredientDataSource();
  const instructionDataSource = mysqlDataSource.getInstructionDataSource();
  const favoriteDataSource = mysqlDataSource.getFavoriteDataSource();
  const categoryDataSource = mysqlDataSource.getCategoryDataSource();
  const dishDataSource = mysqlDataSource.getDishDataSource();
  const unitDataSource = mysqlDataSource.getUnitDataSource();
  const nutritionDataSource = mysqlDataSource.getNutritionDataSource();
  const ingredientDataSource = mysqlDataSource.getIngredientDataSource();

  // const ingredientDataSource = mysqlDataSource.getIngredientDataSource();
  // const roleDataSource = mysqlDataSource.getRoleDataSource();

  // repositories implementation
  const userRepositoryImpl = new UserRepositoryImpl(userDataSource);
  const commonUserRepositoryImpl = new CommonUserRepositoryImpl(
    commonUserDataSource
  );
  const chefRepositoryImpl = new ChefRepositoryImpl(chefDataSource);
  const mySQLTransactionRepositoryImpl =
    new MySQLTransactionsUtilRepositoryImpl(new MySQLTransactionsUtil());
  const recipeRepositoryImpl = new RecipeRepositoryImpl(recipeDataSource);
  const recipeIngredientRepositoryImpl = new RecipeIngredientRepositoryImpl(
    recipeIngredientDataSource
  );
  const instructionRepositoryImpl = new InstructionRepositryImpl(
    instructionDataSource
  );
  const categoryRepositoryImpl = new CategoryRepositoryImpl(categoryDataSource);
  const dishRepositoryImpl = new DishRepositoryImpl(dishDataSource);
  const unitRepositoryImpl = new UnitRepositoryImpl(unitDataSource);
  const favoriteRepositoryImpl = new FavoriteRepositoryImpl(favoriteDataSource);
  const nutritionRepositoryImpl = new NutritionRepositoryImpl(
    nutritionDataSource
  );
  const ingredientRepositoryImpl = new IngredientRepositoryImpl(
    ingredientDataSource
  );

  const authRouter = AuthRouter(
    new RegisterUser(
      userRepositoryImpl,
      commonUserRepositoryImpl,
      chefRepositoryImpl,
      mySQLTransactionRepositoryImpl
    ),
    new LoginUser(userRepositoryImpl),
    new RefreshToken()
  );

  const userRouter = UserRouter(
    new GetCurrentUserUseCaseImpl(
      userRepositoryImpl,
      chefRepositoryImpl,
      commonUserRepositoryImpl
    ),
    new UpdateUserUseCaseImpl(
      userRepositoryImpl,
      commonUserRepositoryImpl,
      chefRepositoryImpl,
      mySQLTransactionRepositoryImpl
    )
  );

  const recipeRouter = RecipeRouter(
    new ListRecipeUseCaseImpl(recipeRepositoryImpl),
    new DetailRecipeUseCaseImpl(recipeRepositoryImpl),
    new CreateRecipeUseCaseImpl(
      recipeRepositoryImpl,
      recipeIngredientRepositoryImpl,
      instructionRepositoryImpl,
      chefRepositoryImpl,
      nutritionDataSource,
      mySQLTransactionRepositoryImpl
    ),
    new UpdateRecipeUseCaseImpl(
      recipeRepositoryImpl,
      recipeIngredientRepositoryImpl,
      instructionRepositoryImpl,
      mySQLTransactionRepositoryImpl
    ),
    new DeleteRecipeUseCaseImpl(
      recipeRepositoryImpl,
      instructionRepositoryImpl,
      recipeIngredientRepositoryImpl,
      mySQLTransactionRepositoryImpl
    ),
    new ListCategoryDishUnitUseCaseImpl(
      categoryRepositoryImpl,
      dishRepositoryImpl,
      unitRepositoryImpl
    ),
    new ListIngredientUseCaseImpl(ingredientRepositoryImpl)
  );

  const favoriteRouter = FavoriteRouter(
    new AddRecipeToFavoriteUseCaseImpl(favoriteRepositoryImpl),
    new ListFavoriteUseCaseImpl(favoriteRepositoryImpl),
    new DeleteFavoriteUseCaseImpl(favoriteRepositoryImpl)
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
  server.use("/favorite", favoriteRouter);

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
