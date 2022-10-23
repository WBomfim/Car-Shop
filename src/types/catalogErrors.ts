import StatusHttp from './statusHttp';

type ErrorObject = { 
  message: string;
  statusHttp: number
};

export enum ErrorsTypes {
  INVALID_MONGO_ID = 'INVALID_MONGO_ID',
}

export type ErrorCatalog = {
  [key in ErrorsTypes]: ErrorObject
};

export const errorCatalog: ErrorCatalog = {
  INVALID_MONGO_ID: {
    statusHttp: StatusHttp.BAD_REQUEST,
    message: 'Id must be a 24 characters hexadecimal',
  },
};
