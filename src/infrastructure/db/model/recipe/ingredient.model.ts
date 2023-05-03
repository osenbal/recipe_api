import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import Ingredient from "@domain/entities/recipe/ingredient";

export interface IngredientModelInput extends Optional<Ingredient, "id"> {}
export interface IngredientModelrOutput extends Required<Ingredient> {}

export class IngredientModel extends Model<Ingredient, IngredientModelInput> {
  public id!: number;
  public name!: string;
  public img_url!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const ingredientAttributes = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    img_url: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: dataTypes.DATE,
      allowNull: false,
      defaultValue: dataTypes.NOW,
    },
    updatedAt: {
      type: dataTypes.DATE,
      allowNull: false,
      defaultValue: dataTypes.NOW,
    },
    deletedAt: {
      type: dataTypes.DATE,
    },
  };

  return IngredientModel.init(ingredientAttributes, {
    sequelize,
    tableName: "ingredients",
    // paranoid: true,
  });
};
