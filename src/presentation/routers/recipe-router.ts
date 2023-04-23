import { Router } from "express";
import { ListRecipeUseCase } from "@domain/interfaces/use-cases/recipe/list-recipe";
import { DetailRecipeUseCase } from "@domain/interfaces/use-cases/recipe/detail-recipe";
import { CreateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/create-recipe";
import RecipeController from "../../infrastructure/controllers/recipe/recipe-controller";
import { uploadMemoryStorage } from "@infrastructure/storage/multer";

export default function RecipeRouter(
  listRecipe: ListRecipeUseCase,
  detailRecipeUseCase: DetailRecipeUseCase,
  createRecipeUseCase: CreateRecipeUseCase
) {
  const router = Router();
  const recipeController = new RecipeController(
    listRecipe,
    detailRecipeUseCase,
    createRecipeUseCase
  );

  router.get("/", recipeController.list());
  router.post(
    "/",
    uploadMemoryStorage.single("thumbnail_url"),
    recipeController.create()
  );
  router.get("/:id", recipeController.getRecipeDetailById());

  return router;
}
