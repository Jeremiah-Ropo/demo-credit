import { Request, NextFunction } from 'express';
import crypto from 'crypto';

import { PAYSTACK_SECRET_KEY } from '../config';
import { EStatus, ITransaction } from '../interfaces';
import { UserModel, WalletModel, TransactionModel } from '../models';
import { CustomError } from '../utils/customError';
import { referenceGenerator } from '../utils/uniqueGenerator';

export const webhookPaystack = async (req: Request, next: NextFunction): Promise<object | void> => {
  const User = new UserModel();
  const Transaction = new TransactionModel();
  const Wallet = new WalletModel();

  try {
    console.log('START: Webhook Service');
    const { body } = req;
    const { data } = body;
    const paystackSignature = req.headers['x-paystack-signature'] as string;

    const hash = crypto.createHmac('sha512', `${PAYSTACK_SECRET_KEY}`);
    hash.update(JSON.stringify(body));
    const expectedSignature = hash.digest('hex');

    if (paystackSignature !== expectedSignature) {
      console.error(`ERROR: Invalid signature`);
    }

    if (body.event === 'charge.success') {
      if (data.metadata.topup_wallet === 'true') {
        const user = await User.findByUserEmail(data.customer.email);
        if (!user) {
          console.error(`ERROR: User not found`);
          return;
        }
        const wallet = await Wallet.findByWalletUserId(data.metadata.wallet_id);

        if (!wallet) {
          console.error(`ERROR: Wallet not found`);
          return;
        }
        const reference = referenceGenerator();
        let transactionPayload: ITransaction = {
          walletId: data.metadata.wallet_id,
          transactionType: 'deposit',
          transactionStatus: EStatus.success,
          reference,
          amount: Number(data.amount / 100),
          balanceBefore: wallet.walletBalance,
          balanceAfter: Number(wallet.walletBalance) + Number(data.amount / 100),
        };
        // Create new Transaction.
        const transaction = await Transaction.createTransaction(transactionPayload);
        // update wallet balance
        await Wallet.updateWallet(data.metadata.wallet_id, {
          walletBalance: Number(wallet.walletBalance) + Number(data.amount / 100),
        });

        return { transaction, message: 'Webhook executed succesfully' };
      }
      if (data.metadata.deduct_wallet === 'true') {
        const reference = await Transaction.findByReference(data.reference);
        if (!reference) {
          console.error('ERROR: Reference not found');
          return;
        }
        if (reference.transactionStatus === EStatus.success) {
          console.error('ERROR: Transaction has already been processed');
          return;
        }
        const wallet = await Wallet.findByWalletUserId(data.metadata.wallet_id);
        if (!wallet) {
          console.error(`ERROR: Wallet not found`);
          return;
        }

        // update transaction
        const updatedTransaction = await Transaction.findByReferenceAndUpdate(data.reference, {
          transactionStatus: EStatus.success,
        });
        await Wallet.updateWallet(data.metadata.wallet_id, {
          walletBalance: Number(wallet.walletBalance) - Number(data.amount / 100),
        });
        return { data: updatedTransaction, message: 'Webhook executed succesfully' };
      }
    }
  } catch (error) {
    console.error(`ERROR: ${error}`);
    return next(new CustomError(500, `Error executing Webhook: ${error}`));
  }
};
