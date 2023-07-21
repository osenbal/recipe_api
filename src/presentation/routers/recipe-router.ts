import { Router } from "express";
import { ListRecipeUseCase } from "@domain/interfaces/use-cases/recipe/list-recipe";
import { DetailRecipeUseCase } from "@domain/interfaces/use-cases/recipe/detail-recipe";
import { CreateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/create-recipe";
import { UpdateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/update-recipe";
import { DeleteRecipeUseCase } from "@domain/interfaces/use-cases/recipe/delete-recipe";
import { ListCategoryDishUnitUseCase } from "@domain/interfaces/use-cases/recipe/list-category-dish-unit";
import { ListIngredientUseCase } from "@domain/interfaces/use-cases/recipe/list-ingredient";
import RecipeController from "../../infrastructure/controllers/recipe/recipe-controller";
import { uploadMemoryStorage } from "@infrastructure/storage/multer";
import checkPermissions from "@domain/middlewares/checkPermissions-middleware";
import validateAccessToken from "@domain/middlewares/validateAccessToken-middleware";
import validateAccessTokenIfExist from "@domain/middlewares/validateTokenIfExist-middleware";
import { PERMISSIONS } from "@constants/permissions";

export default function RecipeRouter(
  listRecipe: ListRecipeUseCase,
  detailRecipeUseCase: DetailRecipeUseCase,
  createRecipeUseCase: CreateRecipeUseCase,
  updateRecipeUseCase: UpdateRecipeUseCase,
  deleteRecipeUseCase: DeleteRecipeUseCase,
  listCategoryDishUnitUseCase: ListCategoryDishUnitUseCase,
  listIngredientUseCase: ListIngredientUseCase
) {
  const router = Router();
  const recipeController = new RecipeController(
    listRecipe,
    detailRecipeUseCase,
    createRecipeUseCase,
    updateRecipeUseCase,
    deleteRecipeUseCase,
    listCategoryDishUnitUseCase,
    listIngredientUseCase
  );

  router.get("/", validateAccessTokenIfExist, recipeController.list());

  router.post(
    "/",
    uploadMemoryStorage.single("thumbnail_url"),
    validateAccessToken,
    checkPermissions(PERMISSIONS.CREATE_RECIPE),
    recipeController.create()
  );

  router.get("/category", recipeController.listCategory());
  router.get("/dish", recipeController.listDish());
  router.get("/unit", recipeController.listUnit());
  router.get("/ingredient", recipeController.getListIngredient());

  router.get(
    "/filter",
    validateAccessTokenIfExist,
    recipeController.filterList()
  );

  router.get(
    "/:recipe_id",
    validateAccessTokenIfExist,
    recipeController.getRecipeDetailById()
  );

  router.patch(
    "/:recipe_id",
    validateAccessToken,
    checkPermissions(PERMISSIONS.UPDATE_RECIPE),
    uploadMemoryStorage.single("thumbnail_url"),
    recipeController.update()
  );

  router.delete(
    "/:recipe_id",
    validateAccessToken,
    checkPermissions(PERMISSIONS.DELETE_RECIPE),
    recipeController.softDelete()
  );

  router.delete(
    "/:recipe_id/delete",
    validateAccessToken,
    checkPermissions(PERMISSIONS.DELETE_RECIPE),
    recipeController.hardDelete()
  );

  return router;
}
