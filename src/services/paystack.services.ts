import { NextFunction } from 'express';
import axios from 'axios';

import { PAYSTACK_SECRET_KEY } from '../config';
import { ITransfer } from '../interfaces';
import { CustomError } from '../utils/customError';

export const paystackPaymentCheckout = async (payload: ITransfer, next: NextFunction) => {
  try {
    const { amount, email, reference, reason, paymentMode, topUp, walletId } = payload;
    const data = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        amount: Number(amount * 100),
        email,
        reference,
        message: reason,
        metadata: {
          topup_wallet: topUp,
          payment_mode: paymentMode,
          wallet_id: walletId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      },
    );
    return data?.data;
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};
