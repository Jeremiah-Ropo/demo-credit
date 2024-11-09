import { NextFunction } from 'express';

import { UserModel } from '../../models';
import { IUser, UserInputDTO } from '../../interfaces';
import { karmaBlackList } from '../../services/karma.services';
import { CustomError } from '../../utils/customError';

export const createUser = async (userInputDTO: UserInputDTO, next: NextFunction): Promise<IUser | void> => {
  const userModel = new UserModel();
  try {
    const { email, karmaIdentity } = userInputDTO;
    const user = await userModel.findByUserEmail(email);
    if (user) {
      next(new CustomError(409, 'User already exists'));
    }
    if (user.blackListed) {
      next(new CustomError(403, 'User is blacklisted'))
    }
    const { data } = await karmaBlackList(karmaIdentity, next);
    console.log(data)
    if (data.reporting_entity.email === email) {
      await userModel.updateUser(email, { blackListed: true });
      next(new CustomError(403, 'User is blacklisted'))
    }
    const newUserId = await userModel.createUser(userInputDTO);
    const newUser = await userModel.findUserById(newUserId);
    
    if (newUser) {
      delete newUser.password;
      return newUser;
    }
    next(new CustomError(500, 'User creation failed'));
  } catch (error: any) {
    next(new CustomError(500, error.message || 'Internal Server Error'));
  }
};
