import { UnitDataSource } from "@data/interfaces/data-sources/recipe/unit-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import Unit from "@domain/entities/recipe/unit";
import { UnitModel } from "@infrastructure/db/model/recipe/unit.model";

export default class MySQLUnitDataSource implements UnitDataSource {
  db: SQLDatabaseWrapper;

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  addUnit(unit: Unit): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async getUnits(): Promise<UnitModel[] | null> {
    const result = await this.db.findAll({
      where: { deletedAt: null },
      attributes: ["id", "name"],
    });
    return result;
  }

  getUnitById(id: number): Promise<UnitModel | null> {
    throw new Error("Method not implemented.");
  }
}
