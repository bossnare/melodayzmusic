'use client';

import { LoginCard } from '@/components/auth/AuthCard';
import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';
import { AuthPageWrapper } from '@/components/auth/AuthWrapper';
import { loginSchema, type loginFormType } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import api from '@/libs/api';

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
      const { status, data } = res;
      console.log(status);
      // if (res.data.success) {
      //   // store token
      //   localStorage.setItem('access_token', res.data.access_token);
      //   // redirect to dashboard
      //   startTransition(() => {
      //     router.replace('/dashboard');
      //   });
      // } else {
      //   form.setError('root', {
      //     type: 'manual',
      //     message: 'Identifiants invalides, Erreur serveur.',
      //   });
      // }

      if (res.data.type === 'account') {
        form.setError('email', {
          type: 'manual',
          message:
            "Oups ! Cette adresse e-mail n'existe pas ou est mal saisie.",
        });
      }
      if (res.data.type === 'password')
        form.setError('password', {
          type: 'manual',
          message: 'Le mot de passe est incorrect. Veuillez réessayer.',
        });
    } catch (e) {
      console.log(e);
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
