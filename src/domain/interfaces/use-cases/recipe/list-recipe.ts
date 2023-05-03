import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";
export interface ListRecipeUseCase {
  execute(): Promise<RecipeModel[] | null>;
  executeFilterRecipe(
    search?: string,
    category_id?: number,
    dish_id?: number,
    chef_id?: number
  ): Promise<RecipeModel[] | null>;
}
