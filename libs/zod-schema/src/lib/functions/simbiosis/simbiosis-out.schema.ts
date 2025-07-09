import { z } from 'zod';

export const SimbiosisOutputSchema = z.object({
  ceoImgUrl: z.string().url(),
});

export type SimbiosisOutputSchemaDto = z.infer<typeof SimbiosisOutputSchema>;