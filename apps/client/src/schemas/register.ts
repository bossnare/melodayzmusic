import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PSEUDO_REGEX,
} from '@/libs/validators/regex';
import { z } from 'zod';

export const registerSchema = z.object({
  step1: z.object({
    pseudo: z
      .string()
      .trim()
      .min(3, { message: 'Le pseudo doit contenir au moins 3 caractères.' })
      .max(15, { message: 'Le pseudo ne doit pas dépasser 15 caractères.' })
      .regex(PSEUDO_REGEX, 'Le pseudo doit contenier au maximum 3 mots.'),
    username: z
      .string()
      .trim()
      .min(3, { message: "L'identifiant doit contenir au moins 3 caractères." })
      .max(15, { message: "L'identifiant ne doit pas dépasser 15 caractères." })
      .regex(USERNAME_REGEX, "Nom d'utilisateur invalide."),
  }),
  step2: z.object({
    email: z.string().email(),
  }),
  step3: z.object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  }),
});

export type stepFormType = z.infer<typeof registerSchema>;
