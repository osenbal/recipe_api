import { CreateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/create-recipe";
import { RecipeRepository } from "@domain/interfaces/repositories/recipe/recipe-repository";
import CloudStorage from "@infrastructure/interfaces/storage/cloud-storage";
import { FirebaseStorageServiceImpl } from "@infrastructure/firebase/storage";
import { RecipeIngredientRepository } from "@domain/interfaces/repositories/recipe/recipeIngredient-repository";
import { InstructionRepositry } from "@domain/interfaces/repositories/recipe/instruction-repository";
import { MySQLTransactionsUtilRepository } from "@domain/interfaces/repositories/utils/mysqlTransaction-util-repository";
import {
  ICreateRecipeIngredientRequestBody,
  ICreateRecipeRequestBody,
} from "@domain/interfaces/http/request-body/recipe";
import Recipe from "@domain/entities/recipe/recipe";
import RecipeIngredient from "@domain/entities/recipe/recipe_ingredient";
// import Instruction from "@do/main/entities/recipe/instruction";

export class CreateRecipeUseCaseImpl implements CreateRecipeUseCase {
  recipeRepository: RecipeRepository;
  recipeIngredientRepository: RecipeIngredientRepository;
  instructionRepository: InstructionRepositry;
  mySQLTransactionsUtilRepository: MySQLTransactionsUtilRepository;
  firebaseStorageService: CloudStorage;

  constructor(
    recipeRepository: RecipeRepository,
    recipeIngredientRepository: RecipeIngredientRepository,
    instructionRepository: InstructionRepositry,
    mySQLTransactionsUtilRepository: MySQLTransactionsUtilRepository
  ) {
    this.recipeRepository = recipeRepository;
    this.recipeIngredientRepository = recipeIngredientRepository;
    this.instructionRepository = instructionRepository;
    this.mySQLTransactionsUtilRepository = mySQLTransactionsUtilRepository;
    this.firebaseStorageService = new FirebaseStorageServiceImpl();
  }

  async execute(data: ICreateRecipeRequestBody): Promise<boolean> {
    //  upload to firebase storage
    const thumbnail_url = await this.firebaseStorageService.uploadFileImage(
      data.file,
      "/assets/image/recipes_thumbnail_img"
    );

    const recipe: Recipe = {
      id: 0,
      chef_id: data.chef_id,
      category_id: data.category_id,
      dish_id: data.dish_id,
      thumbnail_url: thumbnail_url,
      title: data.title,
      description: data.description,
      serving: data.serving,
      cookingTime: data.cookingTime,
      prepTime: data.prepTime,
    };

    // transaction
    const t = await this.mySQLTransactionsUtilRepository.beginTransaction();
    try {
      const newRecipe = await this.recipeRepository.addRecipe(recipe, t);

      if (!newRecipe) throw new Error("Failed to create recipe");

      const ingredients: RecipeIngredient[] = data.ingredients.map(
        (ingredient: ICreateRecipeIngredientRequestBody) => ({
          ...ingredient,
          recipe_id: newRecipe.id,
        })
      );

      const newRecipeIngredients =
        await this.recipeIngredientRepository.addBulkRecipeIngredient(
          ingredients,
          t
        );

      const instructions: any[] = data.instructions.map(
        (instruction: string, index: number) => {
          return {
            recipe_id: newRecipe.id,
            description: instruction,
            order: index + 1,
          };
        }
      );

      const newInstructions =
        await this.instructionRepository.addBulkInstructions(instructions, t);

      await t.commit();
      return newRecipe && newRecipeIngredients && newInstructions
        ? true
        : false;
    } catch (error) {
      await this.mySQLTransactionsUtilRepository.rollbackTransaction();
      throw error;
    }
  }
}
