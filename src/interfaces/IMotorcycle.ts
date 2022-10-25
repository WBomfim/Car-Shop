import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const motorcycleZodSchema = vehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({ required_error: 'Engine capacity is required' })
    .int({ message: 'Engine capacity must be an integer' })
    .positive({ message: 'Engine capacity must be a positive number' })
    .lte(2500, { message: 'Engine capacity must be less than or equal to 2500' }),
});

export type IMotorcycle = z.infer<typeof motorcycleZodSchema>;
export { motorcycleZodSchema };
