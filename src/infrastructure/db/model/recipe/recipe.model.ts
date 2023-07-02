import { DataTypes, Sequelize, Model, Optional } from "sequelize";
interface IRecipeAttributes {
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

export interface RecipeModelInput extends Optional<IRecipeAttributes, "id"> {}
export interface RecipeModelrOutput extends Required<IRecipeAttributes> {}

export class RecipeModel extends Model<IRecipeAttributes, RecipeModelInput> {
  public id!: number;

  public chef_id!: number;
  public category_id!: number;
  public dish_id!: number;

  public title!: string;
  public description!: string;
  public thumbnail_url!: string;
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
    thumbnail_url: {
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
    // paranoid: true
  });
};
