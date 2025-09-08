import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email invalid.' }),
  password: z
    .string()
    .min(6, { message: 'Mot de passe minimum est 6 caractère.' }),
});

export type loginFormType = z.infer<typeof loginSchema>;
