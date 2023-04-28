import { Router } from "express";
import { ListRecipeUseCase } from "@domain/interfaces/use-cases/recipe/list-recipe";
import { DetailRecipeUseCase } from "@domain/interfaces/use-cases/recipe/detail-recipe";
import { CreateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/create-recipe";
import { UpdateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/update-recipe";
import RecipeController from "../../infrastructure/controllers/recipe/recipe-controller";
import { uploadMemoryStorage } from "@infrastructure/storage/multer";
import checkPermissions from "@domain/middlewares/checkPermissions-middleware";
import validateAccessToken from "@domain/middlewares/validateAccessToken-middleware";
import { PERMISSIONS } from "@constants/permissions";

export default function RecipeRouter(
  listRecipe: ListRecipeUseCase,
  detailRecipeUseCase: DetailRecipeUseCase,
  createRecipeUseCase: CreateRecipeUseCase,
  updateRecipeUseCase: UpdateRecipeUseCase
) {
  const router = Router();
  const recipeController = new RecipeController(
    listRecipe,
    detailRecipeUseCase,
    createRecipeUseCase,
    updateRecipeUseCase
  );

  router.get(
    "/",
    validateAccessToken,
    checkPermissions(PERMISSIONS.LIST_RECIPE),
    recipeController.list()
  );
  router.post(
    "/",
    validateAccessToken,
    checkPermissions(PERMISSIONS.CREATE_RECIPE),
    uploadMemoryStorage.single("thumbnail_url"),
    recipeController.create()
  );

  router.get("/:recipe_id", recipeController.getRecipeDetailById());
  router.patch(
    "/:recipe_id",
    validateAccessToken,
    checkPermissions(PERMISSIONS.UPDATE_RECIPE),
    uploadMemoryStorage.single("thumbnail_url"),
    recipeController.update()
  );

  return router;
}
