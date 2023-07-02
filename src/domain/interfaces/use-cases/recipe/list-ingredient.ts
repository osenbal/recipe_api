export interface ListIngredientUseCase {
  execute(): Promise<any[] | null>;
}
