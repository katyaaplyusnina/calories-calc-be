import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Product } from './entity/Product';
import { ProductEntry } from './entity/ProductEntry';
import { UserSettings } from './entity/UserSettings';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Product, ProductEntry, UserSettings],
  synchronize: true,
});
