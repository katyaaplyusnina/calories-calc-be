import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './ormconfig';

const PORT = process.env.PORT ?? 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err: Error) => {
    console.error('Database connection error:', err);
  });
