import { DeleteRecipeUseCase } from "@domain/interfaces/use-cases/recipe/delete-recipe";
import { RecipeRepository } from "@domain/interfaces/repositories/recipe/recipe-repository";
import { InstructionRepositry } from "@domain/interfaces/repositories/recipe/instruction-repository";
import { RecipeIngredientRepository } from "@domain/interfaces/repositories/recipe/recipeIngredient-repository";
import { MySQLTransactionsUtilRepository } from "@domain/interfaces/repositories/utils/mysqlTransaction-util-repository";

export class DeleteRecipeUseCaseImpl implements DeleteRecipeUseCase {
  recipeRepository: RecipeRepository;
  instructionRepository: InstructionRepositry;
  recipeIngredientRepository: RecipeIngredientRepository;
  mySQLTransactionsUtilRepository: MySQLTransactionsUtilRepository;

  constructor(
    recipeRepository: RecipeRepository,
    instructionRepository: InstructionRepositry,
    recipeIngredientRepository: RecipeIngredientRepository,
    mySQLTransactionsUtilRepository: MySQLTransactionsUtilRepository
  ) {
    this.recipeRepository = recipeRepository;
    this.instructionRepository = instructionRepository;
    this.recipeIngredientRepository = recipeIngredientRepository;
    this.mySQLTransactionsUtilRepository = mySQLTransactionsUtilRepository;
  }

  async executeSoftDeleteById(id: number): Promise<boolean> {
    const result = await this.recipeRepository.deleteRecipeById(id);
    return result;
  }

  async executeHardDeleteById(id: number): Promise<boolean> {
    const t = await this.mySQLTransactionsUtilRepository.beginTransaction();
    try {
      const deleteInstructions =
        await this.instructionRepository.hardDeleteInstructionByRecipeId(id, t);

      const deleteRecipeIngredients =
        await this.recipeIngredientRepository.deleteRecipeIngredientByRecipeId(
          id,
          t
        );

      const deleteRecipe = await this.recipeRepository.hardDeleteRecipeById(
        id,
        t
      );

      await t.commit();
      return deleteRecipe && deleteInstructions && deleteRecipeIngredients
        ? true
        : false;
    } catch (error) {
      await this.mySQLTransactionsUtilRepository.rollbackTransaction();
      throw error;
    }
  }
}
