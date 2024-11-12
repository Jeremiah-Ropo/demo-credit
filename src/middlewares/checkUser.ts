import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models';
import { CustomError } from '../utils/customError';

export const checkUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const userModel = new UserModel();
  try {
    const { email } = req.jwtPayload;

    const user = await userModel.findByUserEmail(email);
    if (!user) return next(new CustomError(404, 'User does not exist'));
      req.body.email = user.email;
      req.body.walletId = user.walletId;
    next();
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};
