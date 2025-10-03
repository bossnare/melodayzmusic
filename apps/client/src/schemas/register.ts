import { z } from 'zod';

export const registerSchema = z.object({
  step1: z.object({
    pseudo: z.string().min(3),
    username: z.string().regex(/^[a-zA-Z0-9_]{4,20}$/, "Nom d'utilisateur invalide."),
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
