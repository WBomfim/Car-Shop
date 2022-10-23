import { z } from 'zod';

const vehicleZodSchema = z.object({
  model: z.string({ required_error: 'Model is required' })
    .min(3, { message: 'Model must be at least 3 characters' }),
  year: z.number({ required_error: 'Year is required' })
    .int({ message: 'Year must be an integer' })
    .positive({ message: 'Year must be a positive number' })
    .gte(1900, { message: 'Year must be greater than or equal to 1900' })
    .lte(2022, { message: 'Year must be less than or equal to 2022' }),
  color: z.string({ required_error: 'Color is required' })
    .min(3, { message: 'Color must be at least 3 characters' }),
  status: z.boolean({ invalid_type_error: 'Status must be a boolean' }).optional(),
  buyValue: z.number({ required_error: 'Buy value is required' })
    .int({ message: 'Buy value must be an integer' })
    .positive({ message: 'Buy value must be a positive number' }),
});

export type IVehicle = z.infer<typeof vehicleZodSchema>;
export { vehicleZodSchema };
