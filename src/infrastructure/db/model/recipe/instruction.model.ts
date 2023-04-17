import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import Instruction from "@domain/entities/recipe/instruction";

export interface InstructionModelInput extends Optional<Instruction, "id"> {}
export interface InstructionModelrOutput extends Required<Instruction> {}

export class InstructionModel extends Model<
  Instruction,
  InstructionModelInput
> {
  public id!: number;
  public recipe_id!: number;
  public description!: string;
  public order!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const instructionAttributes = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    recipe_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    order: {
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

  return InstructionModel.init(instructionAttributes, {
    sequelize,
    tableName: "instructions",
    paranoid: true,
  });
};
