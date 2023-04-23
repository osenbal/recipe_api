export default interface Recipe {
  // PK
  id: number;

  // FK
  chef_id: number;
  category_id: number;
  dish_id: number;

  // Attributes
  title: string;
  description: string;
  thumbnail_url: string;
  video_url?: string;

  cookingTime: number;
  prepTime: number;
  serving: number;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
