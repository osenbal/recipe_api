import Category from "@domain/entities/recipe/category";
import { CategoryModel } from "@infrastructure/db/model/recipe/category.model";

export interface CategoryDataSource {
  addCategory(category: Category): Promise<CategoryModel | null>;
  getCategoryById(id: number): Promise<CategoryModel | null>;
  isCategoryExist(category_title: string): Promise<boolean>;
  deleteCategoryById(id: number): Promise<boolean>;
}
