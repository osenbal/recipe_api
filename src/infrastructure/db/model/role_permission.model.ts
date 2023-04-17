import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import RolePermission from "@domain/entities/auth/role_permission";

export interface RolePermissionInput
  extends Optional<RolePermission, "role_id"> {}
export interface RolePermissionOutput extends Required<RolePermission> {}

export class RolePermissionModel extends Model<
  RolePermission,
  RolePermissionInput
> {
  public role_id!: number;
  public permission_id!: number;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const rolePermissionAttributes = {
    role_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    permission_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  };

  return RolePermissionModel.init(rolePermissionAttributes, {
    sequelize,
    tableName: "role_permission",
  });
};
