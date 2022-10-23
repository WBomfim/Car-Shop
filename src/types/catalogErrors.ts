import StatusHttp from './statusHttp';

type ErrorObject = { 
  message: string;
  statusHttp: number
};

export enum ErrorsTypes {
  InvalidMongoId = 'InvalidMongoId',
}

export type ErrorCatalog = {
  [key in ErrorsTypes]: ErrorObject
};

export const errorCatalog: ErrorCatalog = {
  InvalidMongoId: {
    statusHttp: StatusHttp.BAD_REQUEST,
    message: 'Id must be a 24 characters hexadecimal',
  },
};
