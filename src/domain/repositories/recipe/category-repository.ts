import { CategoryRepository } from "@domain/interfaces/repositories/recipe/category-repository";
import { CategoryModel } from "@infrastructure/db/model/recipe/category.model";
import { CategoryDataSource } from "@data/interfaces/data-sources/recipe/category-data-source";

export class CategoryRepositoryImpl implements CategoryRepository {
  private readonly categoryDataSource: CategoryDataSource;

  constructor(categoryDataSource: CategoryDataSource) {
    this.categoryDataSource = categoryDataSource;
  }

  async addCategory(category: CategoryModel): Promise<CategoryModel | null> {
    const result = await this.categoryDataSource.addCategory(category);
    return result;
  }

  async getCategories(): Promise<CategoryModel[] | null> {
    const result = await this.categoryDataSource.getCategories();
    return result;
  }

  async getCategoryById(id: number): Promise<CategoryModel | null> {
    const result = await this.categoryDataSource.getCategoryById(id);
    return result;
  }
}
