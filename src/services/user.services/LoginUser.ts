import { NextFunction } from 'express';

import { UserLoginDTO } from '../../interfaces';
import { UserModel } from '../../models';
import { createJwtToken } from '../../utils/createJwtToken';
import { CustomError } from '../../utils/customError';

export const loginUser = async (userLoginDTO: UserLoginDTO, next: NextFunction): Promise<String | void> => {
  const userModel = new UserModel();
  try {
    const { email, password } = userLoginDTO;
    const user = await userModel.findByUserEmail(email);
    if (!user) return next(new CustomError(404, 'User does not exist'));
    if (user.password !== password) return next(new CustomError(400, 'Invalid email or password'));
    
    const token = createJwtToken({
      user_id: user.id,
      email: user.email,
    });
    await userModel.updateUserLastLogin(user.id);
    return token;
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};
