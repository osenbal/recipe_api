export interface ListRecipeUseCase {
  execute(user_id?: number): Promise<any[] | null>;
  executeFilterRecipe(
    user_id?: number,
    search?: string,
    category_id?: number,
    dish_id?: number,
    chef_id?: number,
    filterTime?: string
  ): Promise<any[] | null>;
}
