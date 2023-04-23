import { ListRecipeUseCase } from "@domain/interfaces/use-cases/recipe/list-recipe";
import { RecipeRepository } from "@domain/interfaces/repositories/recipe/recipe-repository";
import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";

export class ListRecipeUseCaseImpl implements ListRecipeUseCase {
  recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute(): Promise<RecipeModel[] | null> {
    const recipes = await this.recipeRepository.getRecipes();

    if (!recipes) return null;

    return recipes;
  }
}
