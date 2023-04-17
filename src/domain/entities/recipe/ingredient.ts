export default interface Ingredient {
  // PK
  id: number;

  // Attributes
  name: string;
  img_url: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
