import { Request, Response, NextFunction } from "express";
import { ListRecipeUseCase } from "@domain/interfaces/use-cases/recipe/list-recipe";
import { DetailRecipeUseCase } from "@domain/interfaces/use-cases/recipe/detail-recipe";
import { CreateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/create-recipe";
import { UpdateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/update-recipe";
import { DeleteRecipeUseCase } from "@domain/interfaces/use-cases/recipe/delete-recipe";
import { ListCategoryDishUnitUseCase } from "@domain/interfaces/use-cases/recipe/list-category-dish-unit";
import { ICreateRecipeRequestBody } from "@domain/interfaces/http/request-body/recipe";
import { ResponseObj } from "@utils/response";
import { HTTP404Error } from "@domain/exeptions/error-exeption";

export default class RecipeController {
  private listRecipe: ListRecipeUseCase;
  private detailRecipe: DetailRecipeUseCase;
  private createRecipe: CreateRecipeUseCase;
  private updateRecipe: UpdateRecipeUseCase;
  private deleteRecipe: DeleteRecipeUseCase;
  private listCategoryDishUnit: ListCategoryDishUnitUseCase;

  constructor(
    listRecipe: ListRecipeUseCase,
    detailRecipe: DetailRecipeUseCase,
    createRecipe: CreateRecipeUseCase,
    updateRecipe: UpdateRecipeUseCase,
    deleteRecipe: DeleteRecipeUseCase,
    listCategoryDishUnit: ListCategoryDishUnitUseCase
  ) {
    this.listRecipe = listRecipe;
    this.detailRecipe = detailRecipe;
    this.createRecipe = createRecipe;
    this.updateRecipe = updateRecipe;
    this.deleteRecipe = deleteRecipe;
    this.listCategoryDishUnit = listCategoryDishUnit;
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

  public filterList(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { search, category_id, dish_id, chef_id } = req.query;
        const query: any = [];
        search ? query.push(search) : query.push(undefined);
        category_id ? query.push(Number(category_id)) : query.push(undefined);
        dish_id ? query.push(Number(dish_id)) : query.push(undefined);
        chef_id ? query.push(Number(chef_id)) : query.push(undefined);

        // console.log("query params, ", query);

        const result = await this.listRecipe.executeFilterRecipe(...query);

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

  public softDelete(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { recipe_id } = req.params;
        const result = await this.deleteRecipe.executeSoftDeleteById(
          Number(recipe_id)
        );

        if (!result) throw new HTTP404Error("Recipe not found");

        res
          .status(200)
          .send(
            ResponseObj.success("Recipe deleted successfully", { data: result })
          );
      } catch (error) {
        next(error);
      }
    };
  }

  public hardDelete(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { recipe_id } = req.params;
        console.log("req.params", req.params);
        const result = await this.deleteRecipe.executeHardDeleteById(
          Number(recipe_id)
        );

        res
          .status(200)
          .send(
            ResponseObj.success("Recipe deleted successfully", { data: result })
          );
      } catch (error) {
        next(error);
      }
    };
  }

  public listCategory(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.listCategoryDishUnit.listCategory();

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

  public listDish(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.listCategoryDishUnit.listDish();

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

  public listUnit(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.listCategoryDishUnit.listUnit();

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
}
