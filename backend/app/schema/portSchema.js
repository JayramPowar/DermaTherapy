import { z } from 'zod';

const portSchema = z.coerce.number().min(1024).max(65535).default(3000);

export const PORT = portSchema.parse(process.env.PORT);