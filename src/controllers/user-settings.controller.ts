import { Request, Response } from 'express';
import * as service from '../services/user-settings.service';

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const settings = await service.getSettingsById(id);
  if (!settings) {
    res.status(404).json({ message: 'Settings not found' });

    return;
  }

  res.json(settings);
};


export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await service.updateSettings(id, req.body);
  if (!updated) {
    res.status(404).json({ message: 'Settings not found' });

    return;
  }

  res.json(updated);
};
