import { NextFunction } from 'express';

import { UserModel } from '../../models';
import { IUser } from '../../interfaces';
import { CustomError } from '../../utils/customError';

export const getUserById = async (id: number, next: NextFunction): Promise<IUser | void> => {
  const userModel = new UserModel();
  try {
    const user = await userModel.findUserById(id);
    if (!user) return next(new CustomError(400, 'User does not exist'));
    delete user.password;
    return user;
  } catch (error) {
     return next(new CustomError(500, error.message));
  }
};
