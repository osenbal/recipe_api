import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import Nutrition from "@domain/entities/recipe/nutrition";

export interface NutritionModelInput extends Optional<Nutrition, "id"> {}
export interface NutritionModelOutput extends Required<Nutrition> {}

export class NutritionModel extends Model<Nutrition, NutritionModelInput> {
  public id!: number;

  public recipe_id!: number;

  public calories?: number;
  public calories_unit_id?: number;

  public protein?: number;
  public protein_unit_id?: number;

  public fat?: number;
  public fat_unit_id?: number;

  public carbs?: number;
  public carbs_unit_id?: number;

  public sugar?: number;
  public sugar_unit_id?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const nutritionAttributes = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    recipe_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    calories: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    calories_unit_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    protein: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    protein_unit_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    fat: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    fat_unit_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    carbs: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    carbs_unit_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    sugar: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    sugar_unit_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: true,
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
      allowNull: true,
    },
  };

  const nutritionOptions = {
    tableName: "nutrition",
    sequelize,
  };

  NutritionModel.init(nutritionAttributes, nutritionOptions);

  return NutritionModel;
};
