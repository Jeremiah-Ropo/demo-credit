import { NextFunction } from "express";

import { ITransfer } from "../../interfaces";
import { WalletModel } from "../../models";
import { CustomError } from "../../utils/customError";
import { referenceGenerator } from "../../utils/uniqueGenerator";
import { paystackPaymentCheckout } from "../paystack.services";

export const paymentCheckout = async (payload: any, next: NextFunction) => {
    const walletModel = new WalletModel()
    try {
        const { amount, email, paymentMode, walletId } = payload;
        const wallet = await walletModel.findByWalletUserId(walletId);
        if (!wallet) {
          return next(new CustomError(404, "Wallet not found"));
        }
    
        const reference = referenceGenerator();
        let payloadInitializeTransfer: ITransfer = {
          amount,
          paymentMode,
          email,
          walletId,
          reason: null,
          reference,
          topUp: true
        }
        const { data } = await paystackPaymentCheckout(payloadInitializeTransfer, next)
        return data?.authorization_url; 
    } catch (error) {
      return next(new CustomError(500, error.message));
    }
}

