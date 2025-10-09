import api from '@/libs/api';
import { AxiosError } from 'axios';
import { type loginFormType } from '@/schemas/login';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<AxiosError<{ type: string }> | null>(null);
  const [isSwitching, startTransition] = useTransition();
  const router = useRouter();

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
        setError(error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return { handleLogin, isPending, isSwitching, error };
};
