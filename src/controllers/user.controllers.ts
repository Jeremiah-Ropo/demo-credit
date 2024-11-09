import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { createUser, loginUser, updateUser, deleteUser, getUserById, getAllUsers } from '../services/user.services';

import { UserInputDTO, UserLoginDTO } from '../interfaces';

@Service()
class UserController {
  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getUserById(Number(req.params.id), next);
      if (data) {
        res.status(200).send({ message: 'User retrieved successfully', data });
      }
      return;
    } catch (error) {
      next(error);
    }
  };
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: UserInputDTO = req.body;
      const data = await createUser(user, next);
      if (data) {
        res.status(201).send({ message: 'User created successfully', data });
      }
      return;
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: UserLoginDTO = req.body;
      const data = await loginUser(user, next);
      if (data) {
        res.status(200).send({ message: 'User logged in successfully', data });
      }
      return;
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const data = await getAllUsers(query, next);
      if (data) {
        res.status(200).send({ message: 'Users retrieved successfully', data });
      }
      return;
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await updateUser(req.jwtPayload.email, req.body, next);
      if (data) {
        res.status(200).send({ message: 'User updated successfully', data });
      }
      return;
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteUser(Number(req.params.id), next);
      if (data) {
        res.status(200).send({ message: 'User deleted successfully', data });
      }
      return;
    } catch (error) {
      next(error);
    }
  };
}
export default UserController;
