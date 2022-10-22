import { z } from 'zod';
import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';

export default abstract class Service<T> implements IService<T> {
  private _vehicle: IModel<T>;
  private _validate: z.ZodSchema<T>;

  constructor(vehicle: IModel<T>, validationSchema: z.ZodSchema<T>) {
    this._vehicle = vehicle;
    this._validate = validationSchema;
  }

  public async create(obj: unknown): Promise<T> {
    const vehicle = this._validate.safeParse(obj);
    if (!vehicle.success) {
      throw vehicle.error;
    }
    return this._vehicle.create(vehicle.data);
  }
}
