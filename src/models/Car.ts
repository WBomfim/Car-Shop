import { model as createModel, Schema } from 'mongoose';
import MongoModel from './MongoModel';
import { ICar } from '../interfaces/ICar';

const carSchema = new Schema<ICar>({
  model: { type: String, length: 3 },
  year: { type: Number, min: 1900, max: 2022 },
  color: { type: String, length: 3 },
  status: { type: Boolean, required: false },
  buyValue: Number,
  doorsQty: { type: Number, min: 2, max: 4 },
  seatsQty: { type: Number, min: 2, max: 7 },
}, {
  versionKey: false,
});

export default class CarModel extends MongoModel<ICar> {
  constructor(model = createModel<ICar>('Car', carSchema)) {
    super(model);
  }
}
