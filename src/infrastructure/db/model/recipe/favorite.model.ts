import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import Favorite from "@domain/entities/recipe/favorite";

export interface FavoriteModelInput extends Optional<Favorite, "id"> {}
export interface FavoriteModelrOutput extends Required<Favorite> {}

export class FavoriteModel extends Model<Favorite, FavoriteModelInput> {
  public id!: number;
  public recipe_id!: number;
  public user_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const favoriteAttributes = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    recipe_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    user_id: {
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

  return FavoriteModel.init(favoriteAttributes, {
    sequelize,
    tableName: "favorites",
    paranoid: true,
  });
};
