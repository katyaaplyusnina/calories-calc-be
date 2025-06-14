import { AppDataSource } from '../ormconfig';
import { ProductEntry } from '../entity/ProductEntry';
import { Product } from '../entity/Product';

const repo = AppDataSource.getRepository(ProductEntry);
const productRepo = AppDataSource.getRepository(Product);

export const getAllEntries = async () => {
  return repo.find();
};

export const getEntryById = async (id: number) => {
  return repo.findOneBy({ id });
};

export const getEntriesFiltered = async (filter: { date?: string }) => {
  const where: { date?: string } = {};

  if (filter.date) {
    where.date = filter.date;
  }

  return repo.find({
    where,
    order: { id: 'ASC' }
  });
};

export const createEntry = async (data: { productId: number; date: string; weight: number }) => {
  const product = await productRepo.findOneBy({ id: data.productId });

  if (product) {
    const entry = repo.create({ product, date: data.date, weight: data.weight });
    return repo.save(entry);
  }

  throw new Error('Product not found');
};

export const updateEntry = async (
  id: number,
  data: { productId: number; date: string; weight: number }
) => {
  const entry = await repo.findOneBy({ id });

  if (entry) {
    const product = await productRepo.findOneBy({ id: data.productId });
    if (!product) throw new Error('Product not found');
    entry.date = data.date;
    entry.weight = data.weight;
    entry.product = product;

    return repo.save(entry);
  }

  return null;
};

export const deleteEntry = async (id: number) => {
  const result = await repo.delete(id);

  return result.affected !== 0;
};
