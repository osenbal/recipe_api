import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface INutritionAtributes {
  id: number;
  recipe_id: number;
  calories: number;
  protein: number;
  carbs: number;
  sugar: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface NutritionModelInput
  extends Optional<INutritionAtributes, "id"> {}
export interface NutritionModelOutput extends Required<INutritionAtributes> {}

export class NutritionModel extends Model<
  INutritionAtributes,
  NutritionModelInput
> {
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
    protein: {
      type: dataTypes.FLOAT,
      allowNull: true,
    },
    carbs: {
      type: dataTypes.FLOAT,
      allowNull: true,
    },
    sugar: {
      type: dataTypes.FLOAT,
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
    tableName: "nutritions",
    sequelize,
  };

  NutritionModel.init(nutritionAttributes, nutritionOptions);

  return NutritionModel;
};
