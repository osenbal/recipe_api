import Instruction from "@domain/entities/recipe/instruction";
import { InstructionModel } from "@infrastructure/db/model/recipe/instruction.model";
import { Transaction } from "sequelize";

export interface InstructionRepositry {
  addInstruction(
    data: Instruction,
    t?: Transaction
  ): Promise<InstructionModel | null>;
  addBulkInstructions(
    data: Instruction[],
    t?: Transaction
  ): Promise<Instruction[] | null>;

  updateBulkInstructions(
    data: Instruction[],
    t?: Transaction
  ): Promise<Instruction[] | null>;
}
