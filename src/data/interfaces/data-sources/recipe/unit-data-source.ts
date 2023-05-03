import Unit from "@domain/entities/recipe/unit";
import { UnitModel } from "@infrastructure/db/model/recipe/unit.model";

export interface UnitDataSource {
  addUnit(unit: Unit): Promise<boolean>;
  getUnits(): Promise<UnitModel[] | null>;
  getUnitById(id: number): Promise<UnitModel | null>;
}
