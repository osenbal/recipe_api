import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import Unit from "@domain/entities/recipe/unit";

export interface UnitModelInput extends Optional<Unit, "id"> {}
export interface UnitModelOutput extends Required<Unit> {}

export class UnitModel extends Model<Unit, UnitModelInput> {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const unitAttributes = {
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
      allowNull: true,
    },
  };

  return UnitModel.init(unitAttributes, {
    sequelize,
    tableName: "units",
    paranoid: true,
  });
};
