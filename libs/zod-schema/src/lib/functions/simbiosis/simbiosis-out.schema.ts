import { z } from 'zod';

export const SimbiosisOutputSchema = z.object({
  message: z.string(),
  file: z.string().optional(),
  ranBy: z.string().optional(),
});

export type SimbiosisOutputSchemaDto = z.infer<typeof SimbiosisOutputSchema>;