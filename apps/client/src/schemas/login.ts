import { EMAIL_REGEX } from '@/lib/validators/regex';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .refine((val) => val.trim() !== '', { message: '' })
    .regex(EMAIL_REGEX, { message: 'Email invalide.' }),
  // .refine(
  //   (data) => {
  //     const value = data.trim();
  //     const looksLikeEmail = EMAIL_REGEX.test(value);
  //     const looksLikeUsername = USERNAME_REGEX.test(value);

  //     return looksLikeEmail || looksLikeUsername;
  //   },
  //   {
  //     message: "Email ou nom d'utilisateur(@username) invalide.",
  //   }
  // ),
  password: z
    .string()
    .refine((val) => val.trim() !== '', { message: '' })
    .min(8, { message: 'Trop court (8 caractères min.)' }),
});

export type loginFormType = z.infer<typeof loginSchema>;
