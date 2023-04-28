import Instruction from "@domain/entities/recipe/instruction";
import { InstructionModel } from "@infrastructure/db/model/recipe/instruction.model";
import { InstructionDataSource } from "@data/interfaces/data-sources/recipe/instruction-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import { Transaction } from "sequelize";

export default class MySQLInstructionDataSource
  implements InstructionDataSource
{
  private db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }
  async updateInstructionById(
    instruction: Instruction
  ): Promise<InstructionModel | null> {
    if (!this.db.updateById) return null;
    const result = this.db.updateById(instruction.id, instruction);
    return result;
  }

  async updateBulkInstruction(
    instructions: Instruction[],
    t?: Transaction
  ): Promise<InstructionModel[] | null> {
    if (!this.db.bulkUpdate) return null;

    const result = this.db.bulkUpdate(instructions, t);
    return result;
  }
  updateBulkInstructionById(
    instructions: Instruction[]
  ): Promise<InstructionModel[] | null> {
    throw new Error("Method not implemented.");
  }
  getInstructionByRecipeId(
    recipe_id: number
  ): Promise<InstructionModel[] | null> {
    throw new Error("Method not implemented.");
  }
  getInstructionById(id: number): Promise<InstructionModel | null> {
    throw new Error("Method not implemented.");
  }
  isInstructionExist(instruction_title: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteInstructionById(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async addInstruction(
    instruction: Instruction,
    t?: Transaction
  ): Promise<InstructionModel | null> {
    const result = await this.db.create(instruction, t);
    return result;
  }

  async addBulkInstruction(
    instructions: Instruction[],
    t?: Transaction
  ): Promise<InstructionModel[] | null> {
    if (!this.db.bulkCreate) return null;

    const result = await this.db.bulkCreate(instructions, t);
    return result;
  }
}
