export interface DetailRecipeUseCase {
  executeDetailById(id: number, user_id?: number): Promise<any | null>;
}
