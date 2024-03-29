import { MaxRadiusKm } from '$lib/config';
import { z } from 'zod';

export const radiusSchema = z.number().int().positive().max(MaxRadiusKm*1000);