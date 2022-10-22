import { Response, Request } from 'express';
import { IService } from '../interfaces/IService';

export default abstract class Controller<T> {
  protected _service: IService<T>;

  constructor(service: IService<T>) {
    this._service = service;
  }

  public async create(req: Request, res: Response<T>) {
    const { body } = req;
    const obj = await this._service.create(body);
    return res.status(201).json(obj as T);
  }
}
