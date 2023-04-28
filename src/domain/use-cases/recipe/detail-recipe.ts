import { DetailRecipeUseCase } from "@domain/interfaces/use-cases/recipe/detail-recipe";
import { RecipeRepository } from "@domain/interfaces/repositories/recipe/recipe-repository";
import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";

export class DetailRecipeUseCaseImpl implements DetailRecipeUseCase {
  recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async executeDetailById(id: number): Promise<RecipeModel | null> {
    const recipe = await this.recipeRepository.getRecipeById(id);
    if (!recipe) return null;
    // sort instructions by order
    return recipe;
  }
}
