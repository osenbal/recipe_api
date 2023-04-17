import { CategoryDataSource } from "@data/interfaces/data-sources/recipe/category-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import Category from "@domain/entities/recipe/category";
import { CategoryModel } from "@infrastructure/db/model/recipe/category.model";

export default class MySQLCategoryDataSource implements CategoryDataSource {
  db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async addCategory(category: Category): Promise<CategoryModel | null> {
    const result = await this.db.create(category);
    return result;
  }

  async getCategoryById(id: number): Promise<CategoryModel | null> {
    const result = await this.db.findPk(id);
    return result;
  }

  async isCategoryExist(category_title: string): Promise<boolean> {
    const result = await this.db.findOne({ where: { category_title } });
    return result !== null;
  }

  async deleteCategoryById(id: number): Promise<boolean> {
    const result = await this.db.destroy(id);
    return result !== null;
  }
}
