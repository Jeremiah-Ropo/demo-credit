import { NextFunction } from 'express';

import { UserModel } from '../../models';
import { IUser, UserInputDTO } from '../../interfaces';
import { karmaBlackList } from '../../services/karma.services';
import { createWallet } from "../../services/wallet.services";
import { CustomError } from '../../utils/customError';

export const createUser = async (userInputDTO: UserInputDTO, next: NextFunction): Promise<IUser | void> => {
  const userModel = new UserModel();
  try {
    const { email, karmaIdentity, ...rest } = userInputDTO;
    const user = await userModel.findByUserEmail(email);
    if (user) {
      return next(new CustomError(409, 'User already exists'));
    }
    const {data} = await karmaBlackList(karmaIdentity, next);
    if (data.reporting_entity.email === email) {
      return next(new CustomError(403, 'User is blacklisted'))
    }
    const newUserPayload = {
      ...rest,
      email,
    }
    const newUserId = await userModel.createUser(newUserPayload);
    const newUser = await userModel.findUserById(newUserId);
    await createWallet(newUser.email, next)
    if (newUser) {
      delete newUser.password;
      return newUser;
    }
    return next(new CustomError(500, 'User creation failed'));
  } catch (error: any) {
    return next(new CustomError(500, error.message || 'Internal Server Error'));
  }
};
