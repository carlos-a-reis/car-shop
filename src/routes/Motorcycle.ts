import { Router } from 'express';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/Motorcycle';
import MotorcycleController from '../controllers/Motorcycle';

const route = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

const endpoint = '/motorcycles/:id';

route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
route.get(endpoint, (req, res) => motorcycleController.readOne(req, res));
route.put(endpoint, (req, res) => motorcycleController.update(req, res));
route.delete(endpoint, (req, res) => motorcycleController.delete(req, res));

export default route;