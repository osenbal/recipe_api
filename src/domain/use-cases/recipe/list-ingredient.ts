import { ListIngredientUseCase } from "@domain/interfaces/use-cases/recipe/list-ingredient";
import { IngredientRepository } from "@domain/interfaces/repositories/recipe/ingredient-repository";
export class ListIngredientUseCaseImpl implements ListIngredientUseCase {
  ingredientRepository: IngredientRepository;

  constructor(ingredientRepository: IngredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute(): Promise<any[] | null> {
    const result = this.ingredientRepository.getIngredients();
    return result;
  }
}
