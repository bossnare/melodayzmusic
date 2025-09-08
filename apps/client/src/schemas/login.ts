import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email invalide.' }),
  password: z.string().min(6, { message: 'Trop court (6 caractères min.)' }),
});

export type loginFormType = z.infer<typeof loginSchema>;
