import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import Recipe from "@domain/entities/recipe/recipe";

export interface RecipeModelInput extends Optional<Recipe, "id"> {}
export interface RecipeModelrOutput extends Required<Recipe> {}

export class RecipeModel extends Model<Recipe, RecipeModelInput> {
  public id!: number;

  public chef_id!: number;
  public category_id!: number;
  public dish_id!: number;

  public title!: string;
  public description!: string;
  public thumbanail_url!: string;
  public video_url?: string;

  public cookingTime!: number;
  public prepTime!: number;
  public serving!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const recipeAttributes = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    chef_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    category_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    dish_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    title: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    thumbanail_url: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    video_url: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    cookingTime: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    prepTime: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    serving: {
      type: dataTypes.INTEGER.UNSIGNED,
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

  return RecipeModel.init(recipeAttributes, {
    sequelize,
    tableName: "recipes",
    paranoid: true,
  });
};
