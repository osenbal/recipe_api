import { ListRecipeUseCase } from "@domain/interfaces/use-cases/recipe/list-recipe";
import { RecipeRepository } from "@domain/interfaces/repositories/recipe/recipe-repository";
import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";

export class ListRecipeUseCaseImpl implements ListRecipeUseCase {
  recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute(user_id?: number): Promise<any[] | null> {
    const recipes = await this.recipeRepository.getRecipes(user_id);

    if (!recipes) return null;

    return recipes;
  }

  async executeFilterRecipe(
    user_id?: number,
    search?: string,
    category_id?: number,
    dish_id?: number,
    chef_id?: number,
    filterTime?: string
  ): Promise<any[] | null> {
    const recipes = await this.recipeRepository.getRecipeFilter(
      user_id,
      search,
      category_id,
      dish_id,
      chef_id,
      filterTime
    );

    if (!recipes) return null;

    return recipes;
  }
}
