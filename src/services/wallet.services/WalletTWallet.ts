import { NextFunction } from 'express';

import { WalletModel, UserModel } from '../../models';
import { IWallet, WalletToWalletInputDTO } from '../../interfaces';
import { CustomError } from '../../utils/customError';

export const walletToWallet = async (payload: WalletToWalletInputDTO, next: NextFunction): Promise<IWallet | void> => {
  const walletModel = new WalletModel();
  const userModel = new UserModel();
  try {
    const user = await userModel.findByUserEmail(payload.email);
    if (payload.walletId === user.walletId) {
      next(new CustomError(403, "You can't send money to yourself"));
    }
    const wallet = await walletModel.findByWalletUserId(user.walletId);
      if (!wallet) next(new CustomError(404, 'User wallet does not exist'));
      if (wallet.walletBalance <= payload.amount) {
         next(new CustomError(400, "Insufficient balance"))
    }
    const beneficialWallet = await walletModel.findByWalletUserId(payload.walletId);
    if (!beneficialWallet) next(new CustomError(404, 'User with this wallet ID does not exist'));
    let beneficialWalletBalance: number = Number(beneficialWallet.walletBalance) + Number(payload.amount);
      let walletBalance: number = Number(wallet.walletBalance) - Number(payload.amount);
      await walletModel.updateWallet(payload.walletId, { walletBalance: beneficialWalletBalance });
    const walletUpdate = await walletModel.updateWallet(wallet.walletId, { walletBalance });
    return walletUpdate;
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};
