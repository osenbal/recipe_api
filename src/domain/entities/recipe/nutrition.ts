export default interface Nutrition {
  id: number;

  recipe_id: number;

  calories?: number;
  calories_unit_id?: number;

  protein?: number;
  proteid_unit_id?: number;

  fat?: number;
  fat_unit_id?: number;

  carbs?: number;
  carbs_unit_id?: number;

  sugar?: number;
  sugar_unit_id?: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
