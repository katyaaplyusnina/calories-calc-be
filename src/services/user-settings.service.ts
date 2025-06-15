import { AppDataSource } from '../ormconfig';
import { UserSettings } from '../entity/UserSettings';

const repo = AppDataSource.getRepository(UserSettings);

export const getSettingsById = async (id: number) => {
  return repo.findOneBy({ id });
};

export const updateSettings = async (id: number, data: Partial<UserSettings>) => {
  const settings = await repo.findOneBy({ id });

  if (!settings) {
    return null;
  }

  repo.merge(settings, data);

  return repo.save(settings);
};
