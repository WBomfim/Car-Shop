import { Router } from 'express';
import CarModel from '../models/Car';
import CarService from '../services/Car';
import CarController from '../controllers/Car';
import { carZodSchema } from '../interfaces/ICar';

const router = Router();

const carModel = new CarModel();
const carService = new CarService(carModel, carZodSchema);
const carController = new CarController(carService);

router.post('/', (req, res) => carController.create(req, res));

export default router;
