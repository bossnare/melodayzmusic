import { z } from 'zod';
import { EMAIL_REGEX, USERNAME_REGEX } from '@/libs/validators/regex';

export const loginSchema = z.object({
  email: z
    .string()
    .refine((val) => val.trim() !== '', { message: '' })
    .refine(
      (data) => {
        const value = data.trim();
        const looksLikeEmail = EMAIL_REGEX.test(value);
        const looksLikeUsername = USERNAME_REGEX.test(value);

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
