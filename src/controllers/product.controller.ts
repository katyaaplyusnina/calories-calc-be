import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export const getAllProducts = async (_: Request, res: Response) => {
  const users = await productService.getAllProducts();
  res.json(users);
};

export const createProduct = async (req: Request, res: Response) => {
  const user = await productService.createProduct(req.body);
  res.status(201).json(user);
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await productService.updateProduct(id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const success = await productService.deleteProduct(id);
  if (success) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
