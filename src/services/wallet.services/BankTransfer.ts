import { NextFunction } from 'express';
import axios from 'axios';
import { PAYSTACK_SECRET_KEY } from '../../config';

import { ITransaction, EStatus } from "../../interfaces";
import { WalletModel, TransactionModel } from '../../models';
import { CustomError } from '../../utils/customError';
import { referenceGenerator } from '../../utils/uniqueGenerator';

export const initializeTransfer = async (payload: any, next: NextFunction): Promise<object|void> => {
  const walletModel = new WalletModel();
  const transactionModel = new TransactionModel()
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
      transactionType: "withdrawal",
      transactionStatus: EStatus.pending,
      reference,
      amount: amount,
      balanceBefore: wallet.walletBalance,
      balanceAfter: wallet.walletBalance - amount,
    }
    const createTransaction = await transactionModel.createTransaction(transactionPayload);
    const transaction = await transactionModel.findTransactionById(createTransaction);
    const { data } = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        amount: Number(amount * 100),
        email: email,
        reference,
        message: reason,
        metadata: {
          deduct_wallet: true,
          payment_mode: paymentMode,
          transaction_category: "withdrawal",
          wallet_balance_before: {
            wallet_balance: wallet.walletBalance,
          },
          wallet_id: walletId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    return {data: data?.data?.authorization_url, transaction};
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};
