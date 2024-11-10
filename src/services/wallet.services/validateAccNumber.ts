import { NextFunction } from 'express';

import { validateAccountNumber } from '../paystack.services';
import { CustomError } from '../../utils/customError';

export const validateAccNumber = async (payload: any, next: NextFunction): Promise<object | void> => {
  try {
    const {data} = await validateAccountNumber(payload.accountNumber, payload.bankCode, next);
    return data;
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};