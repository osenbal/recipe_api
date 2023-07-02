import { DataTypes, Sequelize, Model, Optional } from "sequelize";
// import CommonUser from "@domain/entities/user/commonUser";
interface ICommonUserAttributes {
  id: number;
  user_id: number;
  name: string;
  profile_url: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CommonUserInput
  extends Optional<ICommonUserAttributes, "id"> {}
export interface CommonUserOutput extends Required<ICommonUserAttributes> {}

export class CommonUserModel extends Model<
  ICommonUserAttributes,
  CommonUserInput
> {
  public id!: number;
  public user_id!: number;
  public name!: string;
  public profile_url!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const commonUserAttributes = {
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

  return CommonUserModel.init(commonUserAttributes, {
    sequelize,
    tableName: "commonUsers",
    paranoid: true,
  });
};
