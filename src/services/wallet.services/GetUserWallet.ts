import { NextFunction } from 'express';

import { UserModel, WalletModel } from '../../models';
import { IWallet } from '../../interfaces';
import { CustomError } from '../../utils/customError';

export const getUserWallet = async (email: string, next: NextFunction): Promise<IWallet | void> => {
  const userModel = new UserModel();
  const walletModel = new WalletModel();
  try {
    const user = await userModel.findByUserEmail(email);
    const wallet = await walletModel.findByWalletUserId(user.walletId);
    if (!wallet) next(new CustomError(400, 'Not found'));
    return wallet;
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};
