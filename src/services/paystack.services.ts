import { NextFunction } from 'express';
import axios from 'axios';

import { PAYSTACK_SECRET_KEY } from '../config';
import { ITransfer } from '../interfaces';
import { CustomError } from '../utils/customError';
import { referenceGenerator } from "../utils/uniqueGenerator"

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

export const createTransferRecipient = async (
  name: string,
  bankCode: string,
  accountNumber: string,
  next: NextFunction,
) => {
  try {
    const data = await axios.post(
      'https://api.paystack.co/transferrecipient',
      {
        type: 'nuban',
        name,
        account_number: accountNumber,
        bank_code: bankCode,
        currency: 'NGN',
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      },
    );
    return data?.data;
  } catch (error) {
    console.error('Error creating transfer recipient:', error.response?.data || error.message);
    return next(new CustomError(500, error.response?.data || error.message));
  }
};

export const initiateTransfer = async (amount: number, recipientCode: string, reason: string, next: NextFunction) => {
  try {
    const data = await axios.post(
      'https://api.paystack.co/transfer',
      {
        source: 'balance',
        amount: amount * 100,
        recipient: recipientCode,
        reason,
        refenence: referenceGenerator(),
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );
    return data?.data;
  } catch (error) {
    console.error('Error initiating transfer:', error.response?.data || error.message);
    return next(new CustomError(500, error.response?.data || error.message));
  }
};

export const verifyTransfer = async (transferCode: string, next: NextFunction) => {
  try {
    const response = await axios.get(`https://api.paystack.co/transfer/${transferCode}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying transfer:', error.response?.data || error.message);
    return next(new CustomError(500, error.response?.data || error.message));
  }
};

export const getAllBankList = async (next: NextFunction) => {
  try {
    const data = await axios.get("https://api.paystack.co/bank", {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error('Error getting bank list:', error.response?.data || error.message);
    return next(new CustomError(500, error.response?.data || error.message));
  }
};

export const validateAccountNumber = async (
  accountNumber: string,
  bankCode: string,
  next: NextFunction,
) => {
  try {
    const data = await axios.get(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      },
    );
    return data.data;
  } catch (error) {
    console.error('Error verifying account number:', error.response?.data || error.message);
    return next(new CustomError(500, error.response?.data || error.message));
  }
};
