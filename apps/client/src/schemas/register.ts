import {
  EMAIL_REGEX,
  PASS_REGEX,
  PSEUDO_REGEX,
  USERNAME_REGEX,
} from '@/lib/validators/regex';
import { z } from 'zod';

const minAge = 13;
const now = new Date();

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
    email: z.string().regex(EMAIL_REGEX, 'Email invalide.'),
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
    birthday: z
      .string()
      .nonempty('Date de naissance requise.')
      .refine(
        (val) => {
          const bday = new Date(val);
          if (isNaN(bday.getTime())) return false;

          let age = now.getFullYear() - bday.getFullYear();
          const m = now.getMonth() - bday.getMonth();
          if (m < 0 || (m === 0 && now.getDate() < bday.getDate())) {
            age--;
          }

          return age >= minAge;
        },
        { message: 'Vous devez avoir au moins 13 ans pour continuer.' }
      ),
    country: z.string().nonempty('Veuillez sélectionner votre pays.'),
    genre: z.string().nonempty('Veuillez sélectionner votre genre.'),
  }),
});

export type stepFormType = z.infer<typeof registerSchema>;
