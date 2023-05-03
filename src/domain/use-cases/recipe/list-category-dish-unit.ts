import { ListCategoryDishUnitUseCase } from "@domain/interfaces/use-cases/recipe/list-category-dish-unit";
import { CategoryRepository } from "@domain/interfaces/repositories/recipe/category-repository";
import { UnitRepository } from "@domain/interfaces/repositories/recipe/unit-repository";
import { DishRepository } from "@domain/interfaces/repositories/recipe/dish-reposotory";
import { CategoryModel } from "@infrastructure/db/model/recipe/category.model";
import { DishModel } from "@infrastructure/db/model/recipe/dish.model";
import { UnitModel } from "@infrastructure/db/model/recipe/unit.model";

export class ListCategoryDishUnitUseCaseImpl
  implements ListCategoryDishUnitUseCase
{
  private readonly categoryRepository: CategoryRepository;
  private readonly dishRepository: DishRepository;
  private readonly unitRepository: UnitRepository;

  constructor(
    categoryRepository: CategoryRepository,
    dishRepository: DishRepository,
    unitRepository: UnitRepository
  ) {
    this.categoryRepository = categoryRepository;
    this.dishRepository = dishRepository;
    this.unitRepository = unitRepository;
  }

  async listCategory(): Promise<CategoryModel[] | null> {
    const result = await this.categoryRepository.getCategories();
    return result;
  }

  async listDish(): Promise<DishModel[] | null> {
    const result = await this.dishRepository.getDishes();
    return result;
  }

  async listUnit(): Promise<UnitModel[] | null> {
    const result = await this.unitRepository.getUnits();
    return result;
  }
}
