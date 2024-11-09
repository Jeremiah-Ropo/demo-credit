import { ITransaction } from '../interfaces';
import { db } from '../utils/connection';

class TransactionModel {
  private tableName = 'Transactions';

  async createTransaction(transaction: ITransaction): Promise<number> {
    const [id] = await db(this.tableName).insert(transaction);
    return id;
  }

  async findTransactionById(id: number): Promise<ITransaction | undefined> {
    return await db(this.tableName).where({ id }).first();
  }

  async findByReference(reference: string): Promise<ITransaction | undefined> {
    return await db(this.tableName).where({ reference }).first();
  }

  async findByIdAndUpdate(id: number, transaction: Partial<ITransaction>): Promise<void> {
    return await db(this.tableName).where({ id }).update(transaction);
  }

  async findByReferenceAndUpdate(reference: string, transaction: Partial<ITransaction>): Promise<void> {
    return await db(this.tableName).where({ reference }).update(transaction);
  }

  async find(query: Partial<ITransaction>): Promise<ITransaction[]> {
    return await db(this.tableName).where(query);
  }
}

export { TransactionModel };
