import { AppDataSource } from '../ormconfig';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSettings } from '../entity/UserSettings';

const repo = AppDataSource.getRepository(User);
const JWT_SECRET = process.env.JWT_SECRET ?? 'secret_key';

export const register = async (login: string, password: string) => {
  const existing = await repo.findOneBy({ login });
  if (existing) throw new Error('User already exists');

  const passwordHash = await bcrypt.hash(password, 10);

  // создаём пустые настройки
  const settings = AppDataSource.getRepository(UserSettings).create({
    weight: 0,
    height: 0,
    age: 0,
    goal: 'maintain',
  });

  const user = repo.create({ login, passwordHash, settings });
  await repo.save(user); // каскадно сохранит и настройки

  return user;
};

export const login = async (login: string, password: string) => {
  const user = await repo.findOneBy({ login });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  return { token };
};

export const getUserFromToken = (token: string): number | null => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
    return payload.userId;
  } catch {
    return null;
  }
};
