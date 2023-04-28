import { Request, Response, NextFunction } from "express";
import { ListRecipeUseCase } from "@domain/interfaces/use-cases/recipe/list-recipe";
import { DetailRecipeUseCase } from "@domain/interfaces/use-cases/recipe/detail-recipe";
import { CreateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/create-recipe";
import { UpdateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/update-recipe";
import { ResponseObj } from "@utils/response";
import { ICreateRecipeRequestBody } from "@domain/interfaces/http/request-body/recipe";

export default class RecipeController {
  private listRecipe: ListRecipeUseCase;
  private detailRecipe: DetailRecipeUseCase;
  private createRecipe: CreateRecipeUseCase;
  private updateRecipe: UpdateRecipeUseCase;

  constructor(
    listRecipe: ListRecipeUseCase,
    detailRecipe: DetailRecipeUseCase,
    createRecipe: CreateRecipeUseCase,
    updateRecipe: UpdateRecipeUseCase
  ) {
    this.listRecipe = listRecipe;
    this.detailRecipe = detailRecipe;
    this.createRecipe = createRecipe;
    this.updateRecipe = updateRecipe;
  }

  public list(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.listRecipe.execute();
        res
          .status(200)
          .send(
            ResponseObj.success("Recipes listed successfully", { data: result })
          );
      } catch (error) {
        next(error);
      }
    };
  }

  /**
   * getRecipeDetailById
   */
  public getRecipeDetailById(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { recipe_id } = req.params;
        const result = await this.detailRecipe.executeDetailById(
          Number(recipe_id)
        );

        res
          .status(200)
          .send(
            ResponseObj.success("Recipes listed successfully", { data: result })
          );
      } catch (error) {
        next(error);
      }
    };
  }

  public create(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const bodyRequest: ICreateRecipeRequestBody = {
          ...req.body,
          file: req.file,
        };

        const result = await this.createRecipe.execute(bodyRequest);
        res
          .status(200)
          .send(
            ResponseObj.success("Recipes listed successfully", { data: result })
          );
      } catch (error) {
        next(error);
      }
    };
  }

  public update(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { recipe_id } = req.params;
        console.log("req.body", req.body);
        console.log("req.params", req.params);

        const bodyRequest: ICreateRecipeRequestBody = {
          ...req.body,
          file: req.file,
        };

        const result = await this.updateRecipe.execute(
          Number(recipe_id),
          bodyRequest
        );

        res
          .status(200)
          .send(
            ResponseObj.success("Recipe Updated successfully", { data: result })
          );
      } catch (error) {
        next(error);
      }
    };
  }
}
