import { Request, Response, NextFunction } from "express";
import { ListRecipeUseCase } from "@domain/interfaces/use-cases/recipe/list-recipe";
import { DetailRecipeUseCase } from "@domain/interfaces/use-cases/recipe/detail-recipe";
import { CreateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/create-recipe";
import { UpdateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/update-recipe";
import { DeleteRecipeUseCase } from "@domain/interfaces/use-cases/recipe/delete-recipe";
import { ListCategoryDishUnitUseCase } from "@domain/interfaces/use-cases/recipe/list-category-dish-unit";
import { ListIngredientUseCase } from "@domain/interfaces/use-cases/recipe/list-ingredient";
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
  private listIngredient: ListIngredientUseCase;

  constructor(
    listRecipe: ListRecipeUseCase,
    detailRecipe: DetailRecipeUseCase,
    createRecipe: CreateRecipeUseCase,
    updateRecipe: UpdateRecipeUseCase,
    deleteRecipe: DeleteRecipeUseCase,
    listCategoryDishUnit: ListCategoryDishUnitUseCase,
    listIngredient: ListIngredientUseCase
  ) {
    this.listRecipe = listRecipe;
    this.detailRecipe = detailRecipe;
    this.createRecipe = createRecipe;
    this.updateRecipe = updateRecipe;
    this.deleteRecipe = deleteRecipe;
    this.listCategoryDishUnit = listCategoryDishUnit;
    this.listIngredient = listIngredient;
  }

  public list(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user_id = req.body.userId;

        const result = await this.listRecipe.execute(user_id).then((res) => {
          return res?.map((item) => item.get({ plain: true }));
        });

        console.log("user id :", user_id);

        const data = result?.map((item) => {
          return {
            ...item,
            is_favorite: item?.favorite?.length > 0 ? true : false,
          };
        });

        res.status(200).send(
          ResponseObj.success("Recipes listed successfully", {
            data,
          })
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
        const { search, category_id, dish_id, chef_id, filterTime } = req.query;
        const query: any = [];
        search ? query.push(search) : query.push(undefined);
        category_id ? query.push(Number(category_id)) : query.push(undefined);
        dish_id ? query.push(Number(dish_id)) : query.push(undefined);
        chef_id ? query.push(Number(chef_id)) : query.push(undefined);
        filterTime ? query.push(filterTime) : query.push(undefined);

        const user_id = req.body.userId;

        const result = await this.listRecipe
          .executeFilterRecipe(user_id, ...query)
          .then((res) => {
            return res?.map((item) => item.get({ plain: true }));
          });

        const data = result?.map((item) => {
          return {
            ...item,
            is_favorite: item?.favorite?.length > 0 ? true : false,
          };
        });

        res
          .status(200)
          .send(
            ResponseObj.success("Recipes listed successfully", { data: data })
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
        const userId = req.body?.userId;

        const result = await this.detailRecipe
          .executeDetailById(Number(recipe_id), userId)
          .then((res) => {
            return res?.get({ plain: true });
          });

        const data = {
          ...result,
          is_favorite: result?.favorite?.length > 0 ? true : false,
        };

        res
          .status(200)
          .send(
            ResponseObj.success("Recipes listed successfully", { data: data })
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
          userId: req.body.userId,
        };
        console.log("userid", req.body.userId);
        console.log("bodyRequest", bodyRequest);

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

  public getListIngredient(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.listIngredient.execute();

        res.status(200).send(
          ResponseObj.success("Ingredients listed successfully", {
            data: result,
          })
        );
      } catch (error) {
        next(error);
      }
    };
  }
}
