import { z } from 'zod';

export const radiusSchema = z.number().positive().max(5000);