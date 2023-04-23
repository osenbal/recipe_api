export default interface RecipeIngredient {
  // FK
  recipe_id: number;
  ingredient_id: number;
  unit_id: number;

  // Attributes
  quantity: number;
}
