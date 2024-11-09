import { NextFunction } from "express";

import { UserModel } from "../../models";
import { IUser } from "../../interfaces";
import { CustomError } from "../../utils/customError";

export const updateUser = async (userId: number, userInputDTO: Partial<IUser>, next: NextFunction): Promise<IUser | void> => {
  const userModel = new UserModel();
  try {
    const userUpdate = await userModel.findByIdAndUpdate(userId, userInputDTO);
    return userUpdate;
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};
