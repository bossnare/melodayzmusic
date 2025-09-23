import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .refine((val) => val.trim() !== '', { message: '' })
    .email({ message: 'Email invalide.' }),
  password: z
    .string()
    .refine((val) => val.trim() !== '', { message: '' })
    .min(6, { message: 'Trop court (6 caractères min.)' }),
});

export type loginFormType = z.infer<typeof loginSchema>;
