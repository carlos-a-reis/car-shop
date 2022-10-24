import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: ['Custom', 'Street', 'Trail'],
  engineCapacity: Number,
});

class Motorcycle extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycle', motorcycleMongooseSchema)) {
    super(model);
  }
}

export default Motorcycle;