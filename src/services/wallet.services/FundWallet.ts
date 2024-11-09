import { NextFunction } from "express";
import axios from "axios";
import { PAYSTACK_SECRET_KEY } from '../../config';

import { WalletModel } from "../../models";
import { CustomError } from "../../utils/customError";
import { referenceGenerator } from "../../utils/uniqueGenerator";

export const paymentCheckout = async (payload: any, next: NextFunction) => {
    const walletModel = new WalletModel()
    try {
        const { amount, email, paymentMode, walletId } = payload;
        const wallet = await walletModel.findByWalletUserId(walletId);
        if (!wallet) {
          return next(new CustomError(404, "Wallet not found"));
        }
    
        const reference = referenceGenerator();
    
        const { data } = await axios.post(
          "https://api.paystack.co/transaction/initialize",
          {
            amount: Number(amount * 100),
            email: email,
            reference,
            metadata: {
              topup_wallet: true,
              payment_mode: paymentMode,
              transaction_category: "wallet-topup",
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
        return data?.data?.authorization_url; 
    } catch (error) {
      return next(new CustomError(500, error.message));
    }
}

