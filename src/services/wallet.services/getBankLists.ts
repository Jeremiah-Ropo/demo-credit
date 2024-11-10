import { NextFunction } from 'express';

import { getAllBankList } from '../paystack.services';
import { CustomError } from '../../utils/customError';

export const getAllBankLists = async (next: NextFunction): Promise<object | void> => {
  try {
    const {data} = await getAllBankList(next);
    return data;
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};