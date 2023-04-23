import Instruction from "@domain/entities/recipe/instruction";
import { InstructionModel } from "@infrastructure/db/model/recipe/instruction.model";
import { Transaction } from "sequelize";

export interface InstructionDataSource {
  addInstruction(
    instruction: Instruction,
    t?: Transaction
  ): Promise<InstructionModel | null>;

  addBulkInstruction(
    instructions: Instruction[],
    t?: Transaction
  ): Promise<InstructionModel[] | null>;

  updateInstructionById(
    instruction: Instruction
  ): Promise<InstructionModel | null>;

  updateBulkInstructionById(
    instructions: Instruction[]
  ): Promise<InstructionModel[] | null>;

  updateBulkInstructionByRecipeId(
    instructions: Instruction[],
    recipe_id: number
  ): Promise<InstructionModel[] | null>;

  getInstructionByRecipeId(
    recipe_id: number
  ): Promise<InstructionModel[] | null>;

  getInstructionById(id: number): Promise<InstructionModel | null>;
  isInstructionExist(instruction_title: string): Promise<boolean>;
  deleteInstructionById(id: number): Promise<boolean>;
}
