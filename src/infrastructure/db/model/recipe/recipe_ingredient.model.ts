import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import RecipeIngredient from "@domain/entities/recipe/recipe_ingredient";

export interface RecipeIngredientModelInput
  extends Optional<
    RecipeIngredient,
    "recipe_id" | "ingredient_id" | "unit_id"
  > {}
export interface RecipeIngredientModelOutput
  extends Required<RecipeIngredient> {}

export class RecipeIngredientModel extends Model<
  RecipeIngredient,
  RecipeIngredientModelInput
> {
  public recipe_id!: number;
  public ingredient_id!: number;
  public unit_id!: number;

  public quantity!: number;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const recipeIngredientAttributes = {
    recipe_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    ingredient_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    unit_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  };

  const recipeIngredientOptions = {
    tableName: "recipe_ingredient",
    timestamps: false,
    autoIncrement: false,
    sequelize,
  };

  RecipeIngredientModel.init(
    recipeIngredientAttributes,
    recipeIngredientOptions
  );

  return RecipeIngredientModel;
};
