export interface UpdateRecipeUseCase {
  execute(recipe_id: number, data: any): Promise<any>;
}
