import { CreateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/create-recipe";
import { RecipeRepository } from "@domain/interfaces/repositories/recipe/recipe-repository";
import CloudStorage from "@infrastructure/interfaces/storage/cloud-storage";
import { FirebaseStorageServiceImpl } from "@infrastructure/firebase/storage";
import { RecipeIngredientRepository } from "@domain/interfaces/repositories/recipe/recipeIngredient-repository";
import { InstructionRepositry } from "@domain/interfaces/repositories/recipe/instruction-repository";
import { ChefRepository } from "@domain/interfaces/repositories/chef-repository";
import { MySQLTransactionsUtilRepository } from "@domain/interfaces/repositories/utils/mysqlTransaction-util-repository";

import {
  ICreateRecipeIngredientRequestBody,
  ICreateRecipeRequestBody,
} from "@domain/interfaces/http/request-body/recipe";
import IRecipe from "@domain/entities/recipe/recipe";
import RecipeIngredient from "@domain/entities/recipe/recipe_ingredient";
import { NutritionRepository } from "@domain/interfaces/repositories/recipe/nutrition-repository";
// import Instruction from "@do/main/entities/recipe/instruction";

const PATH_STORAGE_RECIPE_THUMBNAIL = "/assets/image/recipes_thumbnail_img";

export class CreateRecipeUseCaseImpl implements CreateRecipeUseCase {
  recipeRepository: RecipeRepository;
  recipeIngredientRepository: RecipeIngredientRepository;
  instructionRepository: InstructionRepositry;
  nutritionRepository: NutritionRepository;
  chefRepository: ChefRepository;
  mySQLTransactionsUtilRepository: MySQLTransactionsUtilRepository;
  firebaseStorageService: CloudStorage;

  constructor(
    recipeRepository: RecipeRepository,
    recipeIngredientRepository: RecipeIngredientRepository,
    instructionRepository: InstructionRepositry,
    chefRepository: ChefRepository,
    nutritionRepository: NutritionRepository,
    mySQLTransactionsUtilRepository: MySQLTransactionsUtilRepository
  ) {
    this.recipeRepository = recipeRepository;
    this.recipeIngredientRepository = recipeIngredientRepository;
    this.instructionRepository = instructionRepository;
    this.nutritionRepository = nutritionRepository;
    this.chefRepository = chefRepository;
    this.mySQLTransactionsUtilRepository = mySQLTransactionsUtilRepository;
    this.firebaseStorageService = new FirebaseStorageServiceImpl();
  }

  async execute(data: ICreateRecipeRequestBody): Promise<boolean> {
    //  upload to firebase storage
    const thumbnail_url = await this.firebaseStorageService.uploadFileImage(
      data.file,
      PATH_STORAGE_RECIPE_THUMBNAIL
    );

    console.log("user id", data.userId);

    const findChef = await this.chefRepository.getChefByUserId(data.userId);

    if (!findChef) throw new Error("User not chef");

    const recipe: IRecipe = {
      chef_id: findChef.id,
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

      const nutrition = {
        recipe_id: newRecipe.id,
        ...data.nutrition,
      };

      const newNutrition = await this.nutritionRepository.addNutrition(
        nutrition,
        t
      );

      await t.commit();

      return newRecipe &&
        newRecipeIngredients &&
        newInstructions &&
        newNutrition
        ? true
        : false;
    } catch (error) {
      await this.mySQLTransactionsUtilRepository.rollbackTransaction();
      throw error;
    }
  }
}
