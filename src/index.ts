import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from '../ormconfig';
import { User } from './entity/User';
import { Request, Response } from 'express';

const app = express();
app.use(express.json());
app.use(cors());

AppDataSource.initialize()
  .then(() => console.log('DB initialized'))
  .catch((error) => console.log(error));

// Получить всех пользователей
app.get('/users', async (_, res) => {
  const users = await AppDataSource.getRepository(User).find();
  res.json(users);
});

// Создать пользователя
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = AppDataSource.getRepository(User).create({ name, email });
  await AppDataSource.getRepository(User).save(user);
  res.json(user);
});
app.get('/users/:id', async (req, res) => {
  const user = await AppDataSource.getRepository(User).findOneBy({ id: parseInt(req.params.id) });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    res.json(user);
  }
})

app.get('/users/:id', async (req: Request, res: Response) => {
  const user = await AppDataSource.getRepository(User).findOneBy({ id: parseInt(req.params.id) });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({message: 'User not found'});
  }
});

// Обновить пользователя
app.put('/users/:id', async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: parseInt(req.params.id) });
  if (user) {
    userRepo.merge(user, req.body);
    await userRepo.save(user);
    res.json(user);
  } else {
    res.status(404).json({message: 'User not found'});
  }
});

// Удалить пользователя
app.delete('/users/:id', async (req, res) => {
  const result = await AppDataSource.getRepository(User).delete(parseInt(req.params.id));
  if (result.affected !== 0) {
    res.status(204).send();
  } else {
    res.status(404).json({message: 'User not found'});
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
