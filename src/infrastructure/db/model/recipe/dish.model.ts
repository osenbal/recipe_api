import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import Dish from "@domain/entities/recipe/dish";

export interface DishModelInput extends Optional<Dish, "id"> {}
export interface DishModelrOutput extends Required<Dish> {}

export class DishModel extends Model<Dish, DishModelInput> {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const dishAttributes = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
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

  return DishModel.init(dishAttributes, {
    sequelize,
    tableName: "dishs",
    paranoid: true,
  });
};
