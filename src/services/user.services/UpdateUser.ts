import { NextFunction } from "express";

import { UserModel } from "../../models";
import { IUser } from "../../interfaces";
import { CustomError } from "../../utils/customError";

export const updateUser = async (email: string, userInputDTO: Partial<IUser>, next: NextFunction): Promise<IUser | void> => {
  const userModel = new UserModel();
  try {
    const userUpdate = await userModel.updateUser(email, userInputDTO);
    return userUpdate;
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};
