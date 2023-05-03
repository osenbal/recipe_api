import { UpdateRecipeUseCase } from "@domain/interfaces/use-cases/recipe/update-recipe";
import { RecipeRepository } from "@domain/interfaces/repositories/recipe/recipe-repository";
import CloudStorage from "@infrastructure/interfaces/storage/cloud-storage";
import { FirebaseStorageServiceImpl } from "@infrastructure/firebase/storage";
import { RecipeIngredientRepository } from "@domain/interfaces/repositories/recipe/recipeIngredient-repository";
import { InstructionRepositry } from "@domain/interfaces/repositories/recipe/instruction-repository";
import { MySQLTransactionsUtilRepository } from "@domain/interfaces/repositories/utils/mysqlTransaction-util-repository";
import { HTTP404Error } from "@domain/exeptions/error-exeption";
import Recipe from "@domain/entities/recipe/recipe";
import RecipeIngredient from "@domain/entities/recipe/recipe_ingredient";
import Instruction from "@domain/entities/recipe/instruction";

export class UpdateRecipeUseCaseImpl implements UpdateRecipeUseCase {
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

  async execute(recipe_id: number, data: any): Promise<any> {
    const recipeOld = await this.recipeRepository.getRecipeById(recipe_id);
    if (!recipeOld) throw new HTTP404Error("Recipe not found");

    let thumbnail_url = "";

    if (data.file != undefined) {
      thumbnail_url = await this.firebaseStorageService.uploadFileImage(
        data.file,
        "/assets/image/recipes_thumbnail_img"
      );
    }

    if (thumbnail_url == "") {
      thumbnail_url = recipeOld.thumbnail_url;
    }

    const recipe: Recipe = {
      id: recipe_id,
      chef_id: recipeOld.chef_id,
      category_id: data.category_id ? data.category_id : recipeOld.category_id,
      dish_id: data.dish_id ? data.dish_id : recipeOld.dish_id,
      thumbnail_url: thumbnail_url,
      title: data.title ? data.title : recipeOld.title,
      description: data.description ? data.description : recipeOld.description,
      serving: data.serving ? data.serving : recipeOld.serving,
      cookingTime: data.cookingTime ? data.cookingTime : recipeOld.cookingTime,
      prepTime: data.prepTime ? data.prepTime : recipeOld.prepTime,
      video_url: data.video_url ? data.video_url : recipeOld.video_url,
      updatedAt: new Date(),
    };

    const recipeIngredients: RecipeIngredient[] = data.ingredients.map(
      (ingredient: any) => {
        return {
          recipe_id: Number(recipe_id),
          ingredient_id: Number(ingredient.ingredient_id),
          quantity: Number(ingredient.quantity),
          unit_id: Number(ingredient.unit_id),
          updatedAt: new Date(),
        };
      }
    );

    const recipeInstructions: Instruction[] = data.instructions.map(
      (instruction: any, index: number) => {
        return {
          id: Number(instruction.id),
          recipe_id: recipe_id,
          order: index + 1,
          description: instruction.description,
          updatedAt: new Date(),
        };
      }
    );

    const t = await this.mySQLTransactionsUtilRepository.beginTransaction();
    try {
      // const updateRecipe = await recipeOld.save();
      const updateRecipe = await this.recipeRepository.updateRecipeById(
        recipe_id,
        recipe,
        t
      );

      // delete all recipe ingredients old
      await this.recipeIngredientRepository.deleteRecipeIngredientByRecipeId(
        recipe_id,
        t
      );

      // add new recipe ingredients
      const addRecipeIngredients =
        await this.recipeIngredientRepository.addBulkRecipeIngredient(
          recipeIngredients,
          t
        );

      // update instructions
      const updateRecipeInstructions =
        await this.instructionRepository.updateBulkInstructions(
          recipeInstructions,
          t
        );

      await t.commit();
      return updateRecipe && updateRecipeInstructions && addRecipeIngredients
        ? true
        : false;
    } catch (error) {
      await this.mySQLTransactionsUtilRepository.rollbackTransaction();
      throw error;
    }
  }
}
