import { TransactionsUtil } from "@data/interfaces/utils/transactions-util";
import { sequelize } from "../../../../infrastructure/db/sequelize";

export default class MySQLTransactionsUtil implements TransactionsUtil {
  async beginTransaction(): Promise<any> {
    return await sequelize.transaction();
  }

  async commitTransaction(): Promise<any> {
    return await (
      await sequelize.transaction()
    ).commit;
  }

  async rollbackTransaction(): Promise<any> {
    return await (
      await sequelize.transaction()
    ).rollback;
  }
}
