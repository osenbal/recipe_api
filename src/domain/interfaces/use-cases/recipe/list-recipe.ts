import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";
export interface ListRecipeUseCase {
  execute(): Promise<RecipeModel[] | null>;
}
