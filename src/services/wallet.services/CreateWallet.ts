import { NextFunction } from 'express';

import { WalletModel, UserModel } from '../../models';
import { IWallet, WalletInputDTO } from '../../interfaces';
import { CustomError } from '../../utils/customError';
import { uniqueGeneratorWalletId } from '../../utils/uniqueGenerator';

export const createWallet = async (email: string, next: NextFunction): Promise<IWallet | void> => {
  const walletModel = new WalletModel();
  const userModel = new UserModel();
  try {
    const user = await userModel.findByUserEmail(email);
    if (!user) {
      return next(new CustomError(404, 'User does not exists'));
    }
    const walletExist = await walletModel.findByWalletUserId(user.walletId);
    if (walletExist || user.walletId) {
      return next(new CustomError(409, 'User already has a wallet'));
    }
    const walletInput: WalletInputDTO = {
      userId: user.id,
      walletName: `${user.lastName} ${user.firstName}`,
      walletId: uniqueGeneratorWalletId(),
    };
    const newWalletId = await walletModel.createWallet(walletInput);
    const newWallet = await walletModel.findWalletById(newWalletId);
    await userModel.findByIdAndUpdate(user.id, { walletId: newWallet?.walletId });
    if (newWallet) {
      return newWallet;
    }
    return next(new CustomError(500, 'User creation failed'));
  } catch (error: any) {
    return next(new CustomError(500, error.message || 'Internal Server Error'));
  }
};
