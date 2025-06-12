import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid ID' });
  }

  const user = await userService.getUserById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({message: 'User not found'});
  }
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await userService.updateUser(id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({message: 'User not found'});
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const success = await userService.deleteUser(id);
  if (success) {
    res.status(204).end();
  } else {
    res.status(404).json({message: 'User not found'});
  }
};
