import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

class MotorcycleController {
  private _service: IService<IMotorcycle>;

  constructor(service: IService<IMotorcycle>) {
    this._service = service;
  }

  public async create(
    req: Request,
    res: Response,
  ) {
    const { model, year, color, status, buyValue, category, engineCapacity } = req.body;
    const motorcycle = { model, year, color, status, buyValue, category, engineCapacity };
    
    const motorcycleCreated = await this._service.create(motorcycle);

    res.status(201).json(motorcycleCreated);
  }

  public async read(
    _req: Request,
    res: Response,
  ) {
    const carsFound = await this._service.read();

    res.status(200).json(carsFound);
  }

  public async readOne(
    req: Request,
    res: Response,
  ) {
    const { id } = req.params;
    const carFound = await this._service.readOne(id);

    res.status(200).json(carFound);
  }

  public async update(
    req: Request,
    res: Response,
  ) {
    const { id } = req.params;
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = req.body;
    const car = { model, year, color, status, buyValue, doorsQty, seatsQty };

    const carUpdated = await this._service.update(id, car);
    console.log(carUpdated);
    
    res.status(200).json(carUpdated);
  }

  public async delete(
    req: Request,
    res: Response,
  ) {
    const { id } = req.params;
    
    await this._service.delete(id);

    res.status(204).end();
  }
}

export default MotorcycleController;