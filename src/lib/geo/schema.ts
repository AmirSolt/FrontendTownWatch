import { z } from 'zod';

export const radiusSchema = z.number().int().positive().max(5000);