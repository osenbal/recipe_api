import Category from "@domain/entities/recipe/category";
import { CategoryModel } from "@infrastructure/db/model/recipe/category.model";

export interface CategoryRepository {
  addCategory(category: Category): Promise<CategoryModel | null>;
  getCategories(): Promise<CategoryModel[] | null>;
  getCategoryById(id: number): Promise<CategoryModel | null>;
}
