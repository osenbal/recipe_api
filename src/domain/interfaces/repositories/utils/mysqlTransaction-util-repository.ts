export interface MySQLTransactionsUtilRepository {
  beginTransaction(): Promise<any>;
  commitTransaction(): Promise<any>;
  rollbackTransaction(): Promise<any>;
}
