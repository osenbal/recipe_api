import { CategoryModel } from "@infrastructure/db/model/recipe/category.model";
import { DishModel } from "@infrastructure/db/model/recipe/dish.model";
import { UnitModel } from "@infrastructure/db/model/recipe/unit.model";

export interface ListCategoryDishUnitUseCase {
  listCategory(): Promise<CategoryModel[] | null>;
  listDish(): Promise<DishModel[] | null>;
  listUnit(): Promise<UnitModel[] | null>;
}
