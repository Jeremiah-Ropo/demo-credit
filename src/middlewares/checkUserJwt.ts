import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { JwtPayload } from "../utils/createJwtToken";

export const checkUserJwt = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
      const token = req.get("Authorization").split(" ")[1];
    if (!token) {
      return res.status(403).send({ message: "Authorization header not provided" });      
    }

    let jwtPayload: { [key: string]: any };
    jwtPayload = jwt.verify(token, JWT_SECRET as string) as { [key: string]: any };
    // Remove iat and exp from jwtPayload
    ["iat", "exp"].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
    req.jwtPayload = jwtPayload as JwtPayload;
    next();
  } catch (error) {
    return res.status(401).send({ message: error.message});
  }
};






