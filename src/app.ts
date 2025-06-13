import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);

export default app;
