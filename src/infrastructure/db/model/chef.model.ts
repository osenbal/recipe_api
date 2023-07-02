import { DataTypes, Sequelize, Model, Optional } from "sequelize";
interface ChefAttributes {
  id: number;
  user_id: number;
  name: string;
  profile_url: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ChefModelInput extends Optional<ChefAttributes, "id"> {}
export interface ChefModelrOutput extends Required<ChefAttributes> {}

export class ChefModel extends Model<ChefAttributes, ChefModelInput> {
  public id!: number;
  public user_id!: string;
  public name!: string;
  public profile_url!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const chefAttributes = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    profile_url: {
      type: dataTypes.STRING,
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
    },
  };

  return ChefModel.init(chefAttributes, {
    sequelize,
    tableName: "chefs",
    paranoid: true,
  });
};
