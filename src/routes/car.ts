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
router.get('/', (req, res) => carController.read(req, res));
router.get('/:id', (req, res) => carController.readOne(req, res));
router.put('/:id', (req, res) => carController.update(req, res));
router.delete('/:id', (req, res) => carController.delete(req, res));

export default router;
