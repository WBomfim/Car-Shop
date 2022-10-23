import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number({ required_error: 'Doors quantity is required' })
    .int({ message: 'Doors quantity must be an integer' })
    .positive({ message: 'Doors quantity must be a positive number' })
    .gte(2, { message: 'Doors quantity must be greater than or equal to 2' })
    .lte(4, { message: 'Doors quantity must be less than or equal to 4' }),
  seatsQty: z.number({ required_error: 'Seats quantity is required' })
    .int({ message: 'Seats quantity must be an integer' })
    .positive({ message: 'Seats quantity must be a positive number' })
    .gte(2, { message: 'Seats quantity must be greater than or equal to 2' })
    .lte(7, { message: 'Seats quantity must be less than or equal to 7' }),
});

export type ICar = z.infer<typeof carZodSchema>;
export { carZodSchema };
