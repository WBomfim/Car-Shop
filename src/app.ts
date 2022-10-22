import express from 'express';
import 'express-async-errors';
import carRoutes from './routes/car';

const app = express();

app.use(express.json());
app.use('/cars', carRoutes);

export default app;
