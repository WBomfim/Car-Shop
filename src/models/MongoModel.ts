import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorsTypes } from '../types/catalogErrors';

export default abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj:T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this._model.find({});
  }

  public async readOne(_id:string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorsTypes.INVALID_MONGO_ID);
    return this._model.findOne({ _id });
  }

  public async update(_id:string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorsTypes.INVALID_MONGO_ID);
    return this._model.findOneAndUpdate({ _id }, { ...obj }, { new: true });
  }

  public async delete(_id:string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorsTypes.INVALID_MONGO_ID);
    return this._model.findByIdAndDelete(_id);
  }
}
