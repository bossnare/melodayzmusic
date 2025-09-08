'use client';

import { LoginCard } from '@/components/auth/AuthCard';
import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';
import { AuthPageWrapper } from '@/components/auth/AuthWrapper';
import { loginSchema, type loginFormType } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const handleLogin = async (data: loginFormType) => {
    try {
      const res = await fetch(
        'https://melodayzmusic-api.onrender.com/api/v1/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) router.push('/dashboard');
      else alert('Aza tia hosoka');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthPageWrapper>
      {/* Header */}
      <AuthHeaderSwitch href="/auth/register" type="login" />
      {/* card */}
      <LoginCard form={form} handleLogin={handleLogin} />
    </AuthPageWrapper>
  );
}
