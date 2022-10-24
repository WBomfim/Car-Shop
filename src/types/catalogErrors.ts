import StatusHttp from './statusHttp';

type ErrorObject = { 
  statusHttp: number
  error: string;
};

export enum ErrorsTypes {
  INVALID_MONGO_ID = 'INVALID_MONGO_ID',
  NOT_FOUND = 'NOT_FOUND',
}

export type ErrorCatalog = {
  [key in ErrorsTypes]: ErrorObject
};

export const errorCatalog: ErrorCatalog = {
  INVALID_MONGO_ID: {
    statusHttp: StatusHttp.BAD_REQUEST,
    error: 'Id must have 24 hexadecimal characters',
  },
  NOT_FOUND: {
    statusHttp: StatusHttp.NOT_FOUND,
    error: 'Object not found',
  },
};
