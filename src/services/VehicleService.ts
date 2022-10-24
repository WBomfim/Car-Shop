import { ZodSchema } from 'zod';
import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { ErrorsTypes } from '../types/catalogErrors';

export default abstract class Service<T> implements IService<T> {
  private _vehicle: IModel<T>;
  private _validate: ZodSchema<T>;

  constructor(vehicle: IModel<T>, validationSchema: ZodSchema<T>) {
    this._vehicle = vehicle;
    this._validate = validationSchema;
  }

  public async create(obj: unknown): Promise<T> {
    const vehicle = this._validate.safeParse(obj);
    if (!vehicle.success) throw vehicle.error;
    return this._vehicle.create(vehicle.data);
  }

  public async read(): Promise<T[]> {
    return this._vehicle.read();
  }

  public async readOne(_id: string): Promise<T | null> {
    const vehicle = await this._vehicle.readOne(_id);
    if (!vehicle) throw new Error(ErrorsTypes.NOT_FOUND);
    return vehicle;
  }

  public async update(_id: string, obj: unknown): Promise<T | null> {
    const vehicle = this._validate.safeParse(obj);
    if (!vehicle.success) throw vehicle.error;
    const newVehicle = await this._vehicle.update(_id, vehicle.data);
    if (!newVehicle) throw new Error(ErrorsTypes.NOT_FOUND);
    return newVehicle;
  }

  public async delete(_id: string): Promise<true | null> {
    const vehicle = await this._vehicle.delete(_id);
    if (!vehicle) throw new Error(ErrorsTypes.NOT_FOUND);
    return true;
  }
}
