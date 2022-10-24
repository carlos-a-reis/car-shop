import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const motorcycleZodSchema = vehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().lte(2500).positive(),
});

type IMotorcycle = z.infer<typeof motorcycleZodSchema>;

export { IMotorcycle, motorcycleZodSchema };