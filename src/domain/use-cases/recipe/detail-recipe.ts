import { DetailRecipeUseCase } from "@domain/interfaces/use-cases/recipe/detail-recipe";
import { RecipeRepository } from "@domain/interfaces/repositories/recipe/recipe-repository";
import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";

export class DetailRecipeUseCaseImpl implements DetailRecipeUseCase {
  recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async executeDetailById(id: number, user_id?: number): Promise<any | null> {
    const recipe = await this.recipeRepository.getRecipeById(id, user_id);
    if (!recipe) return null;
    // sort instructions by order
    return recipe;
  }
}
