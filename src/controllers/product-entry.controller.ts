import { Request, Response } from 'express';
import * as service from '../services/product-entry.service';

export const getAll = async (req: Request, res: Response) => {
  const date = req.query.date as string | undefined;

  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    res.status(400).json({ message: 'Invalid date format (expected YYYY-MM-DD)' });

    return;
  }

  const entries = await service.getEntriesFiltered({ date });
  res.json(entries);
};

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const entry = await service.getEntryById(id);

  if (!entry) {
    res.status(404).json({ message: 'Entry not found' });
  } else {
    res.json(entry);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const newEntry = await service.createEntry(req.body);
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updated = await service.updateEntry(id, req.body);

    if (!updated) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      res.json(updated);
    }
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const success = await service.deleteEntry(id);

  if (!success) {
    res.status(404).json({ message: 'Entry not found' });
  } else {
    res.status(204).end();
  }
};
