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

  async executeFilterRecipe(
    search?: string,
    category_id?: number,
    dish_id?: number,
    chef_id?: number
  ): Promise<RecipeModel[] | null> {
    const recipes = await this.recipeRepository.getRecipeFilter(
      search,
      category_id,
      dish_id,
      chef_id
    );

    if (!recipes) return null;

    return recipes;
  }
}
