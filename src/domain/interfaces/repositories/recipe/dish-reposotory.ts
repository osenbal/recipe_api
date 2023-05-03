import Dish from "@domain/entities/recipe/dish";
import { DishModel } from "@infrastructure/db/model/recipe/dish.model";

export interface DishRepository {
  addDish(dish: Dish): Promise<DishModel | null>;
  getDishes(): Promise<DishModel[] | null>;
  getDishById(id: number): Promise<DishModel | null>;
}
