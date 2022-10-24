import { Response, Request } from 'express';
import { IService } from '../interfaces/IService';
import StatusHttp from '../types/statusHttp';

export default abstract class Controller<T> {
  protected _service: IService<T>;

  constructor(service: IService<T>) {
    this._service = service;
  }

  public async create(req: Request, res: Response<T>) {
    const { body } = req;
    const data = await this._service.create(body);
    return res.status(StatusHttp.CREATED).json(data as T);
  }

  public async read(req: Request, res: Response<T[]>) {
    const data = await this._service.read();
    return res.status(StatusHttp.OK).json(data as T[]);
  }

  public async readOne(req: Request, res: Response<T>) {
    const { id } = req.params;
    const data = await this._service.readOne(id);
    return res.status(StatusHttp.OK).json(data as T);
  }

  public async update(req: Request, res: Response<T>) {
    const { id } = req.params;
    const { body } = req;
    const data = await this._service.update(id, body);
    return res.status(StatusHttp.OK).json(data as T);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(StatusHttp.NO_CONTENT).end();
  }
}
