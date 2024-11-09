import { NextFunction } from 'express';

import { UserModel } from '../../models';
import { CustomError } from '../../utils/customError';

export const deleteUser = async (userId: number, next: NextFunction): Promise<string | void> => {
  const userModel = new UserModel()
  try {
    const user = await userModel.findUserById(userId);
    if (!user) next(new CustomError(404, 'User does not exist'));
    await userModel.deleteUser(userId);
    return "user deleted successfully";
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};
