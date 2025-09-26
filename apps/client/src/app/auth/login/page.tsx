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
      if (res.data.success) {
        // store token
        localStorage.setItem('access_token', res.data.access_token);
        // redirect to dashboard
        startTransition(() => {
          router.replace('/dashboard');
        });
      } else {
        form.setError('root', {
          type: "manual",
          message: 'Identifiants invalides, Erreur serveur.',
        });
      }
    } catch (e) {
      console.log(e);
  const res = err.response?.data

  // ohatra raha manampy field ao backend ianao
  if (res.type === "email") {
    form.setError("email", { type: "manual", message: res.message })
  }
  else if (res.type === "password") {
    form.setError("password", { type: "manual", message: res.message })
  }
  else {
    form.setError("root", { type: "manual", message: res.message })
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
