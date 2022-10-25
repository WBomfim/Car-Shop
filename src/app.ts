import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/handleErrors';
import carRoutes from './routes/car';
import motorcycleRoutes from './routes/Motorcycle';

const app = express();

app.use(express.json());
app.use('/cars', carRoutes);
app.use('/motorcycles', motorcycleRoutes);
app.use(errorHandler);

export default app;
