import { NextFunction } from 'express';

import { verifyTransfer } from '../paystack.services';
import { CustomError } from '../../utils/customError';

export const verifyBankTransfer = async (payload: any, next: NextFunction): Promise<object | void> => {
  try {
    const {data} = await verifyTransfer(payload.transferCode, next);
    return data;
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};

