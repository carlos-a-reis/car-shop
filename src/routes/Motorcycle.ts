import { Router } from 'express';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/Motorcycle';
import MotorcycleController from '../controllers/Motorcycle';

const route = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
route.get('/motorcycles/:id', (req, res) => motorcycleController.readOne(req, res));
route.put('/motorcycles/:id', (req, res) => motorcycleController.update(req, res));

export default route;