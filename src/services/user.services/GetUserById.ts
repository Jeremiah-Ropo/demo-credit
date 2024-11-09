import { NextFunction } from 'express';

import { UserModel } from '../../models';
import { IUser } from '../../interfaces';
import { CustomError } from '../../utils/customError';

export const getUserById = async (id: number, next: NextFunction): Promise<IUser | void> => {
  const userModel = new UserModel();
  try {
    const user = await userModel.findUserById(id);
    if (!user) next(new CustomError(404, 'User does not exist'));
    delete user.password;
    return user;
  } catch (error) {
     next(new CustomError(500, error.message));
  }
};
