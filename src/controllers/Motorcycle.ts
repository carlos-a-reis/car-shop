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
    const motorcyclesCreatedFound = await this._service.read();

    res.status(200).json(motorcyclesCreatedFound);
  }

  public async readOne(
    req: Request,
    res: Response,
  ) {
    const { id } = req.params;
    const motorcycleFound = await this._service.readOne(id);

    res.status(200).json(motorcycleFound);
  }

  public async update(
    req: Request,
    res: Response,
  ) {
    const { id } = req.params;
    const { model, year, color, status, buyValue, category, engineCapacity } = req.body;
    const motorcycle = { model, year, color, status, buyValue, category, engineCapacity };

    const motorcycleUpdated = await this._service.update(id, motorcycle);
    
    res.status(200).json(motorcycleUpdated);
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