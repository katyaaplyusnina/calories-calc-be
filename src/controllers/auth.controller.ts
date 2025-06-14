import { Request, Response } from 'express';
import * as auth from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await auth.register(req.body.login, req.body.password);
    res.status(201).json({ id: user.id, login: user.login });
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await auth.login(req.body.login, req.body.password);
    res.json(result);
  } catch (e) {
    res.status(401).json({ message: (e as Error).message });
  }
};
