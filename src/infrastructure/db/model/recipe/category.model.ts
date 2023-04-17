import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import Category from "@domain/entities/recipe/category";

export interface CategoryModelInput extends Optional<Category, "id"> {}
export interface CategoryModelrOutput extends Required<Category> {}

export class CategoryModel extends Model<Category, CategoryModelInput> {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const categoryAttributes = {
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

  return CategoryModel.init(categoryAttributes, {
    sequelize,
    tableName: "categories",
    paranoid: true,
  });
};
