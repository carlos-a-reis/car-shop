import IService from '../interfaces/IService';
import { IMotorcycle, motorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const created = await this._motorcycle.create(parsed.data);

    return created;
  }

  public async read(): Promise<IMotorcycle[]> {
    const cars = await this._motorcycle.read();

    return cars;
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const car = await this._motorcycle.readOne(_id);

    if (!car) throw Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const carUpdated = await this._motorcycle.update(_id, parsed.data);

    if (!carUpdated) throw Error(ErrorTypes.EntityNotFound);

    return carUpdated;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const carDeleted = await this._motorcycle.delete(_id);

    if (!carDeleted) throw Error(ErrorTypes.EntityNotFound);

    return carDeleted;
  }
}

export default MotorcycleService;