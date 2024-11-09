import { Request, Response, NextFunction } from "express";

import { CustomError } from "../utils/customError";

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.status).json(err.message);
};