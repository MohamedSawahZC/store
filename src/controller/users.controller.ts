import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';

const userModel = new UserModel();

export const get = async (req: Request, res: Response) => {
  res.send({
    message: 'Hello, How are u babe',
  });
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      status: 'success',
      data: { ...user },
      message: 'user created successfully',
    });
  } catch (error) {
    next(error);
  }
};
