import { Router } from "express";
import { AddRecipeToFavoriteUseCase } from "@domain/interfaces/use-cases/favorite/add-favorite";
import { ListFavoriteUseCase } from "@domain/interfaces/use-cases/favorite/list-favorite";
import { DeleteFavoriteUseCase } from "@domain/interfaces/use-cases/favorite/delete-favorite";
import validateAccessToken from "@domain/middlewares/validateAccessToken-middleware";
import FavoriteController from "@infrastructure/controllers/favorite/favorite-controller";
import checkPermissions from "@domain/middlewares/checkPermissions-middleware";
import { PERMISSIONS } from "@constants/permissions";

export default function FavoriteRouter(
  addFavorite: AddRecipeToFavoriteUseCase,
  listFavorite: ListFavoriteUseCase,
  deleteFavorite: DeleteFavoriteUseCase
) {
  const router = Router();
  const favoriteController = new FavoriteController(
    addFavorite,
    listFavorite,
    deleteFavorite
  );

  router.get(
    "/",
    validateAccessToken,
    favoriteController.getListFavoriteByUserId()
  );
  router.post("/", validateAccessToken, favoriteController.addFavoriteRecipe());
  router.delete(
    "/:favorite_id",
    validateAccessToken,
    favoriteController.deleteFavoriteRecipe()
  );

  return router;
}
