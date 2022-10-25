import { model as createModel, Schema } from 'mongoose';
import MongoModel from './MongoModel';
import { IMotorcycle } from '../interfaces/IMotorcycle';

const motorcycleSchema = new Schema<IMotorcycle>({
  model: { type: String, length: 3 },
  year: { type: Number, min: 1900, max: 2022 },
  color: { type: String, length: 3 },
  status: { type: Boolean, required: false },
  buyValue: { type: Number, min: 0 },
  category: { type: String, enum: ['Street', 'Custom', 'Trail'] },
  engineCapacity: { type: Number, min: 1, max: 2500 },
}, {
  versionKey: false,
});

export default class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = createModel<IMotorcycle>('Motorcycle', motorcycleSchema)) {
    super(model);
  }
}
