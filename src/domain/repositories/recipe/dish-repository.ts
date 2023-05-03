import { DishRepository } from "@domain/interfaces/repositories/recipe/dish-reposotory";
import { DishModel } from "@infrastructure/db/model/recipe/dish.model";
import { DishDataSource } from "@data/interfaces/data-sources/recipe/dish-data-source";

export class DishRepositoryImpl implements DishRepository {
  private readonly dishDataSource: DishDataSource;

  constructor(dishDataSource: DishDataSource) {
    this.dishDataSource = dishDataSource;
  }

  async addDish(dish: DishModel): Promise<DishModel | null> {
    const result = await this.dishDataSource.addDish(dish);
    return result;
  }

  async getDishes(): Promise<DishModel[] | null> {
    const result = await this.dishDataSource.getDishes();
    return result;
  }

  async getDishById(id: number): Promise<DishModel | null> {
    const result = await this.dishDataSource.getDishById(id);
    return result;
  }
}
