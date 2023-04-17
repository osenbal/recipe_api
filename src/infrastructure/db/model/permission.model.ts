import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import Permission from "@domain/entities/auth/permission";

export interface PermissionInput extends Optional<Permission, "id"> {}
export interface PermissionOutput extends Required<Permission> {}

export class PermissionModel extends Model<Permission, PermissionInput> {
  public id!: number;
  public title!: string;
  public description!: string;

  // timestamps!
  public readonly createdat!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const permissionAttributes = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    description: {
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

  return PermissionModel.init(permissionAttributes, {
    sequelize,
    tableName: "permissions",
    paranoid: true,
  });
};
