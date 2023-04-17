export default interface Favorite {
  id: number;
  recipe_id: number;
  user_id: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
