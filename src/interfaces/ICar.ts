import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number().int().positive().gte(2)
    .lte(4),
  seatsQty: z.number().int().positive().gte(2)
    .lte(7),
});

export type ICar = z.infer<typeof carZodSchema>;
export { carZodSchema };
