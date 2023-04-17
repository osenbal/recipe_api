import Role from "@domain/entities/auth/role";
import {
  Sequelize,
  DataTypes,
  ModelAttributes,
  Model,
  Optional,
} from "sequelize";

export interface RoleInput extends Optional<Role, "id"> {}
export interface RoleOutput extends Required<Role> {}

// This is the model interface
export class RoleModel extends Model<Role, RoleInput> {
  public id!: number;
  public title!: string;
  public description!: string;

  // timestamps!
  public readonly createdat!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const roleAttributes: ModelAttributes<RoleModel> = {
    id: {
      type: dataTypes.INTEGER().UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: dataTypes.STRING(),
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING(),
      allowNull: false,
    },
    createdAt: {
      type: dataTypes.DATE(),
      allowNull: false,
    },
    updatedAt: {
      type: dataTypes.DATE(),
      allowNull: false,
    },
    deletedAt: {
      type: dataTypes.DATE(),
    },
  };

  return RoleModel.init(roleAttributes, {
    sequelize,
    tableName: "roles",
    paranoid: true,
  });
};
