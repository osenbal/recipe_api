export interface ICreateRecipeIngredientRequestBody {
  ingredient_id: number;
  unit_id: number;
  quantity: number;
}

export interface ICreateRecipeRequestBody {
  userId: number;
  category_id: number;
  dish_id: number;

  title: string;
  description: string;

  file: any;
  video_url: string;

  cookingTime: number;
  prepTime: number;
  serving: number;

  ingredients: ICreateRecipeIngredientRequestBody[];
  instructions: string[];

  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    sugar: number;
  };
}
