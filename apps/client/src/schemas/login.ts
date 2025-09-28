import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .refine((val) => val.trim() !== '', { message: '' })
    .refine(
      (data) => {
        const value = data.trim();
        const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
        const looksLikeUsername = /^@[a-zA-Z0-9_]{3,20}$/.test(value);

        return looksLikeEmail || looksLikeUsername;
      },
      {
        message: "Email ou nom d'utilisateur(@username) invalide.",
      }
    ),
  password: z
    .string()
    .refine((val) => val.trim() !== '', { message: '' })
    .min(6, { message: 'Trop court (6 caractères min.)' }),
});

export type loginFormType = z.infer<typeof loginSchema>;
