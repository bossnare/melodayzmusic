'use client';

import { LoginCard } from '@/components/auth/AuthCard';
import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';
import { AuthPageWrapper } from '@/components/auth/AuthWrapper';
import { loginSchema, type loginFormType } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
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

  const handleLogin = async (data: loginFormType) => {
    try {
      setIsPending(true);
      const res = await api.post('/auth/login', data);
      if (res.data.message === 'ok') {
        startTransition(() => {
          router.replace('/dashboard');
        });
      } else {
        alert('Error')
        return form.setError('root', {
          message: 'Identifiants invalides, Erreur serveur.',
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    // prefetch the dashboard page
    router.prefetch('/dashboard');
  }, [router]);

  return (
    <AuthPageWrapper>
      {/* Header */}
      <AuthHeaderSwitch href="/auth/register" type="login" />
      {/* card */}
      <LoginCard form={form} isPending={loading} handleLogin={handleLogin} />
    </AuthPageWrapper>
  );
}
