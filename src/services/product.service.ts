import { AppDataSource } from '../ormconfig';
import { Product } from '../entity/Product';

const repo = AppDataSource.getRepository(Product);

export const getAllProducts = async () => {
  return repo.find();
};

export const createProduct = async (data: Partial<Product>) => {
  const product = repo.create(data);

  return repo.save(product);
};

export const updateProduct = async (id: number, data: Partial<Product>) => {
  const product = await repo.findOneBy({ id });

  if (!product) {
    return null;
  }

  repo.merge(product, data);

  return repo.save(product);
};

export const deleteProduct = async (id: number) => {
  const result = await repo.delete(id);
  return result.affected !== 0;
};
