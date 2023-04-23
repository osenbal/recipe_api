import { InstructionRepositry } from "@domain/interfaces/repositories/recipe/instruction-repository";
import { InstructionDataSource } from "@data/interfaces/data-sources/recipe/instruction-data-source";
import Instruction from "@domain/entities/recipe/instruction";
import { InstructionModel } from "@infrastructure/db/model/recipe/instruction.model";
import { Transaction } from "sequelize";

export class InstructionRepositryImpl implements InstructionRepositry {
  instructionDataSource: InstructionDataSource;

  constructor(instructionDataSource: InstructionDataSource) {
    this.instructionDataSource = instructionDataSource;
  }

  async addInstruction(
    data: Instruction,
    t?: Transaction
  ): Promise<InstructionModel | null> {
    const result = await this.instructionDataSource.addInstruction(data, t);
    return result;
  }

  async addBulkInstructions(
    data: Instruction[],
    t?: Transaction
  ): Promise<Instruction[] | null> {
    const result = await this.instructionDataSource.addBulkInstruction(data, t);
    return result;
  }
}
