export interface DeleteRecipeUseCase {
  executeSoftDeleteById(id: number): Promise<boolean>;
  executeHardDeleteById(id: number): Promise<boolean>;
}
