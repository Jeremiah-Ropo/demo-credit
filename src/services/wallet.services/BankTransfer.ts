import { NextFunction } from 'express';

import { ITransaction, EStatus, ITransfer } from '../../interfaces';
import { WalletModel, TransactionModel } from '../../models';
import { CustomError } from '../../utils/customError';
import { paystackPaymentCheckout } from '../paystack.services';
import { referenceGenerator } from '../../utils/uniqueGenerator';

export const initializeTransfer = async (payload: any, next: NextFunction): Promise<object | void> => {
  const walletModel = new WalletModel();
  const transactionModel = new TransactionModel();
  try {
    const { amount, paymentMode, email, walletId, reason } = payload;
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
    };
    const createTransaction = await transactionModel.createTransaction(transactionPayload);
    const transaction = await transactionModel.findTransactionById(createTransaction);
    let payloadInitializeTransfer: ITransfer = {
      amount,
      paymentMode,
      email,
      walletId,
      reason,
      reference,
      topUp: false,
    };
    const { data } = await paystackPaymentCheckout(payloadInitializeTransfer, next);
    return { data: data?.authorization_url, transaction };
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};
