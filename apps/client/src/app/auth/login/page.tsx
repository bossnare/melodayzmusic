'use client';

import { LoginCard } from '@/components/auth/AuthCard';
import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';
import { AuthPageWrapper } from '@/components/auth/AuthWrapper';
import { loginSchema, type loginFormType } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/libs/api';

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false);
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
      if (res.data.access_token) {
        router.replace('/dashboard');
      } else {
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
      <LoginCard form={form} isPending={isPending} handleLogin={handleLogin} />
    </AuthPageWrapper>
  );
}
