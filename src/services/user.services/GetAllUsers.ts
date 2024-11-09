import { NextFunction } from "express";

import { UserModel } from "../../models";
import { IUser } from "../../interfaces";
import { CustomError } from "../../utils/customError";

export const getAllUsers = async (
  query: Partial<IUser>,
  next: NextFunction,
): Promise<object | void> => {
  const userModel = new UserModel()
  try {
    const data = await userModel.find(query);
    if (data?.length === 0) return next(new CustomError(404, "No User found"));
    const count = await userModel.countDocuments(query);
    const result = {
      data,
      total: count,
    };
    return result;
  } catch (error) {
    return next(new CustomError(500,  error.message));
  }
};
