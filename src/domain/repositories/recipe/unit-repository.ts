import { UnitRepository } from "@domain/interfaces/repositories/recipe/unit-repository";
import { UnitModel } from "@infrastructure/db/model/recipe/unit.model";
import { UnitDataSource } from "@data/interfaces/data-sources/recipe/unit-data-source";

export class UnitRepositoryImpl implements UnitRepository {
  private readonly unitDataSource: UnitDataSource;

  constructor(unitDataSource: UnitDataSource) {
    this.unitDataSource = unitDataSource;
  }

  async getUnits(): Promise<UnitModel[] | null> {
    const result = await this.unitDataSource.getUnits();
    return result;
  }

  async getUnitById(id: number): Promise<UnitModel | null> {
    const result = await this.unitDataSource.getUnitById(id);
    return result;
  }
}
