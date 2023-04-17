import Dish from "@domain/entities/recipe/dish";
import { DishModel } from "@infrastructure/db/model/recipe/dish.model";

export interface DishDataSource {
  addDish(dish: Dish): Promise<DishModel | null>;
  getDishById(id: number): Promise<DishModel | null>;
  isDishExist(dish_title: string): Promise<boolean>;
  deleteDishById(id: number): Promise<boolean>;
}
