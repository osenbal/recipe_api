import { UnitModel } from "@infrastructure/db/model/recipe/unit.model";

export interface UnitRepository {
  getUnits(): Promise<UnitModel[] | null>;
  getUnitById(id: number): Promise<UnitModel | null>;
}
