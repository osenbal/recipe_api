export default interface Instruction {
  // PK
  id: number;

  // FK
  recipe_id: number;

  // Attributes
  description: string;
  order: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
