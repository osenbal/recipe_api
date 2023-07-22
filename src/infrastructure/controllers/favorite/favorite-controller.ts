import { Request, Response, NextFunction } from "express";
import { AddRecipeToFavoriteUseCase } from "@domain/interfaces/use-cases/favorite/add-favorite";
import { ListFavoriteUseCase } from "@domain/interfaces/use-cases/favorite/list-favorite";
import { DeleteFavoriteUseCase } from "@domain/interfaces/use-cases/favorite/delete-favorite";
import { ResponseObj } from "../../../utils/response";
import { HTTP404Error } from "@domain/exeptions/error-exeption";

export default class FavoriteController {
  private addFavorite: AddRecipeToFavoriteUseCase;
  private listFavorite: ListFavoriteUseCase;
  private deleteFavorite: DeleteFavoriteUseCase;

  constructor(
    addFavorite: AddRecipeToFavoriteUseCase,
    listFavorite: ListFavoriteUseCase,
    deleteFavorite: DeleteFavoriteUseCase
  ) {
    this.addFavorite = addFavorite;
    this.listFavorite = listFavorite;
    this.deleteFavorite = deleteFavorite;
  }

  public addFavoriteRecipe(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { recipe_id, userId } = req.body;

        const result = await this.addFavorite.execute(userId, recipe_id);

        if (result === null) {
          throw new HTTP404Error("Favorite already exists");
        }

        res.status(200).send(
          ResponseObj.success("Favorite added successfully", {
            data: result,
          })
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public getListFavoriteByUserId(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId } = req.body;
        const result = await this.listFavorite.executeGetListByUserId(
          Number(userId)
        );
        res.status(200).send(
          ResponseObj.success("Favorite added successfully", {
            data: result,
          })
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public deleteFavoriteRecipe(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { recipe_id, userId } = req.body;
        const result = await this.deleteFavorite.execute(
          Number(recipe_id),
          Number(userId)
        );

        if (!result) {
          throw new HTTP404Error("Favorite not found");
        }

        res.status(200).send(
          ResponseObj.success("Favorite deleted successfully", {
            data: result,
          })
        );
      } catch (error) {
        next(error);
      }
    };
  }
}
