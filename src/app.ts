import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import productEntryRoutes from './routes/product-entry.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/entries', productEntryRoutes);

export default app;
