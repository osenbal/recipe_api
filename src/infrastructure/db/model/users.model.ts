import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import User from "@domain/entities/auth/user";

export interface UserInput extends Optional<User, "id"> {}
export interface UserOutput extends Required<User> {}

export class UserModel extends Model<User, UserInput> implements User {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const userAttributes = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    role_id: {
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
      type: dataTypes.DATE(),
    },
  };

  return UserModel.init(userAttributes, {
    sequelize,
    tableName: "users",
    paranoid: true,
  });
};
