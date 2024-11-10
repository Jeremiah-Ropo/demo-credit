import { NextFunction } from 'express';

import { ITransaction, EStatus, ITransfer } from '../../interfaces';
import { WalletModel, TransactionModel } from '../../models';
import { CustomError } from '../../utils/customError';
import { createTransferRecipient, initiateTransfer } from '../paystack.services';
import { referenceGenerator } from '../../utils/uniqueGenerator';

export const initializeTransfer = async (payload: any, next: NextFunction): Promise<object | void> => {
  const walletModel = new WalletModel();
  const transactionModel = new TransactionModel();
  try {
    const { amount, name, bankCode, accountNumber, walletId, reason } = payload;
    const wallet = await walletModel.findByWalletUserId(walletId);
    if (!wallet) {
      return next(new CustomError(404, 'Wallet not found'));
    }

    if (Number(wallet.walletBalance) <= amount) {
      return next(new CustomError(400, 'Insufficient balance'));
    }
    const reference = referenceGenerator();
    let transactionPayload: ITransaction = {
      walletId,
      transactionType: 'withdrawal',
      transactionStatus: EStatus.pending,
      reference,
      amount,
      balanceAfter: Number(wallet.walletBalance) - Number(amount),
      balanceBefore: wallet.walletBalance,
    };
    const createTransaction = await transactionModel.createTransaction(transactionPayload);
    const transaction = await transactionModel.findTransactionById(createTransaction);

    const { data } = await createTransferRecipient(name, bankCode, accountNumber, next);
    const init = await initiateTransfer(amount, data.recipient_code, reason, next);

    await walletModel.updateWallet(walletId, {
      walletBalance: Number(wallet.walletBalance) - Number(data.amount / 100),
    });
    return { data: init, transaction };
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};
