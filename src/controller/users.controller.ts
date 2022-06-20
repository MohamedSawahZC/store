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

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getMany();
    res.json({
      status: 'success',
      data: users,
      message: 'user retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getOne(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: user,
      message: 'user retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateUser(req.body);
    res.json({
      status: 'success',
      data: user,
      message: 'user updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.deleteUser(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: user,
      message: 'user deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
