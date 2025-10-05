import {
  USERNAME_REGEX,
  PSEUDO_REGEX,
  PASS_REGEX,
} from '@/libs/validators/regex';
import { z } from 'zod';

export const registerSchema = z.object({
  step1: z.object({
    pseudo: z
      .string()
      .trim()
      .min(3, { message: 'Le pseudo doit contenir au moins 3 caractères.' })
      .max(20, { message: 'Le pseudo ne doit pas dépasser 20 caractères.' })
      .regex(PSEUDO_REGEX, 'Le pseudo doit contenier au maximum 3 mots.'),
    username: z
      .string()
      .trim()
      .min(3, { message: "L'identifiant doit contenir au moins 3 caractères." })
      .max(20, { message: "L'identifiant ne doit pas dépasser 20 caractères." })
      .regex(USERNAME_REGEX, "Nom d'utilisateur invalide."),
  }),
  step2: z.object({
    email: z.string().email(),
  }),
  step3: z.object({
    password: z
      .string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères.')
      .regex(
        PASS_REGEX,
        'Le mot de passe doit contenir majuscule, minuscule et chiffre.'
      ),
    confirmPassword: z
      .string()
      .refine((val) => val.trim() !== '', { message: '' }),
  }),
  step4: z.object({
    birthday: z.string().refine((val) => !!val, {
      message: 'Veuillez sélectionner votre date de naissance.',
    }),
    country: z.string().nonempty('Veuillez sélectionner votre pays.'),
    genre: z.string().nonempty('Veuillez sélectionner votre genre.'),
  }),
});

export type stepFormType = z.infer<typeof registerSchema>;
