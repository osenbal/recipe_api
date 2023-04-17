import { MySQLTransactionsUtilRepository } from "@domain/interfaces/repositories/utils/mysqlTransaction-util-repository";
import { TransactionsUtil } from "@data/interfaces/utils/transactions-util";

export class MySQLTransactionsUtilRepositoryImpl
  implements MySQLTransactionsUtilRepository
{
  mySQLTransactionsUtil: TransactionsUtil;

  constructor(mySQLTransactionsUtil: TransactionsUtil) {
    this.mySQLTransactionsUtil = mySQLTransactionsUtil;
  }

  beginTransaction(): Promise<any> {
    return this.mySQLTransactionsUtil.beginTransaction();
  }
  commitTransaction(): Promise<any> {
    return this.mySQLTransactionsUtil.commitTransaction();
  }
  rollbackTransaction(): Promise<any> {
    return this.mySQLTransactionsUtil.rollbackTransaction();
  }
}
