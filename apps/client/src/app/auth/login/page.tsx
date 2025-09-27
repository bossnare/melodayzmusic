'use client';

import { LoginCard } from '@/components/auth/AuthCard';
import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';
import { AuthPageWrapper } from '@/components/auth/AuthWrapper';
import api from '@/libs/api';
import { loginSchema, type loginFormType } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const loading = isPending || isLoading;

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (credentials: loginFormType) => {
    try {
      setIsPending(true);
      const res = await api.post('/auth/login', credentials);
      if (res.data.success) {
        // store token
        localStorage.setItem('access_token', res.data.access_token);
        // redirect to dashboard
        startTransition(() => {
          router.replace('/dashboard');
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data;
        if (res.type === 'account') {
          form.setError('email', {
            type: 'manual',
            message:
              "Oups ! Cette adresse e-mail n'existe pas ou est mal saisie.",
          });
        }

        if (res.type === 'password') {
          form.setError('password', {
            type: 'manual',
            message: 'Le mot de passe est incorrect. Veuillez réessayer.',
          });
        }
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AuthPageWrapper>
      {/* Header */}
      <AuthHeaderSwitch href="/auth/register" type="login" />
      {/* card */}
      <LoginCard form={form} isPending={loading} handleLogin={handleLogin} />
    </AuthPageWrapper>
  );
}
