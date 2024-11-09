import { IWallet, WalletInputDTO } from '../interfaces';
import {db} from '../utils/connection';

class WalletModel {
  private tableName = 'Wallets';

  async createWallet(wallet: WalletInputDTO): Promise<number> {
    const walletPayload: IWallet = {
      ...wallet,
      walletBalance: 0,
      freezed: false,
    };
    const [id] = await db(this.tableName).insert(walletPayload);
    return id;
  }

  async findWalletById(id: number): Promise<IWallet | undefined> {
    return await db(this.tableName).where({ id }).first();
  }

  async findByWalletUserId(walletId: string): Promise<IWallet | undefined> {
    return await db(this.tableName).where({ walletId }).first();
  }

  async updateWallet(walletId: string, wallet: Partial<IWallet>): Promise<IWallet |undefined> {
    await db(this.tableName).where({ walletId }).update(wallet);
    return this.findByWalletUserId(walletId)
  }

  async findByIdAndUpdate(id: number, wallet: WalletInputDTO): Promise<void> {
    await db(this.tableName).where({ id }).update(wallet);
  }

  async deleteWallet(id: number): Promise<void> {
    const deleted = true;
    await db(this.tableName).where({ id }).delete();
  }
}

export { WalletModel };
