import { AppDataSource } from '../ormconfig';
import { User } from '../entity/User';

const repo = AppDataSource.getRepository(User);

export const getAllUsers = async () => {
  return repo.find();
};

export const getUserById = async (id: number) => {
  return repo.findOneBy({ id });
};

export const createUser = async (data: Partial<User>) => {
  const user = repo.create(data);
  return repo.save(user);
};

export const updateUser = async (id: number, data: Partial<User>) => {
  const user = await repo.findOneBy({ id });
  if (!user) return null;

  repo.merge(user, data);
  return repo.save(user);
};

export const deleteUser = async (id: number) => {
  const result = await repo.delete(id);
  return result.affected !== 0;
};
