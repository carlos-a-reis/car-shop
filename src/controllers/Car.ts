import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

class CarController {
  private _service: IService<ICar>;

  constructor(service: IService<ICar>) {
    this._service = service;
  }

  public async create(
    req: Request,
    res: Response,
  ) {
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = req.body;
    const car = { model, year, color, status, buyValue, doorsQty, seatsQty };
    
    const carCreated = await this._service.create(car);

    res.status(201).json(carCreated);
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
}

export default CarController;