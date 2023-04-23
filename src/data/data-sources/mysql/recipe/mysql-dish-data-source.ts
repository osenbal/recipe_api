import Dish from "@domain/entities/recipe/dish";
import { DishModel } from "@infrastructure/db/model/recipe/dish.model";
import { DishDataSource } from "@data/interfaces/data-sources/recipe/dish-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";

export default class MySQLDishDataSource implements DishDataSource {
  db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async addDish(dish: Dish): Promise<DishModel | null> {
    const result = await this.db.create(dish);
    return result;
  }

  async getDishById(id: number): Promise<DishModel | null> {
    if (!this.db.findPk) return null;
    const result = await this.db.findPk(id);
    return result;
  }

  async isDishExist(dish_title: string): Promise<boolean> {
    const result = await this.db.findOne({ where: { dish_title } });
    return result !== null;
  }

  async deleteDishById(id: number): Promise<boolean> {
    if (!this.db.destroyById) return false;
    const result = await this.db.destroyById(id);
    return result !== null;
  }
}
