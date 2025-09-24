import { z } from 'zod';

export const registerSchema = z.object({
  step1: z.object({
    pseudo: z.string().min(3),
    username: z.string().min(4),
  }),
  step2: z.object({
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  }),
  step3: z.object({
    email: z.string().email(),
  }),
});

export type stepFormType = z.infer<typeof registerSchema>;
