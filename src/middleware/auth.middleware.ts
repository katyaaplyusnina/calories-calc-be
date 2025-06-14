import { Request, Response, NextFunction } from 'express';
import { getUserFromToken } from '../services/auth.service';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or invalid token' });

    return;
  }

  const token = authHeader.split(' ')[1];
  const userId = getUserFromToken(token);
  if (!userId) {
    res.status(401).json({ message: 'Invalid token' });

    return;
  }

  // todo
  (req as any).userId = userId;
  next();
};
