import { Router } from 'express';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/Motorcycle';
import MotorcycleController from '../controllers/Motorcycle';
import { motorcycleZodSchema } from '../interfaces/IMotorcycle';

const router = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel, motorcycleZodSchema);
const motorcycleController = new MotorcycleController(motorcycleService);

router.post('/', (req, res) => motorcycleController.create(req, res));
router.get('/', (req, res) => motorcycleController.read(req, res));
router.get('/:id', (req, res) => motorcycleController.readOne(req, res));
router.put('/:id', (req, res) => motorcycleController.update(req, res));
router.delete('/:id', (req, res) => motorcycleController.delete(req, res));

export default router;
