import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";
export interface DetailRecipeUseCase {
  executeDetailById(id: number): Promise<RecipeModel | null>;
}
