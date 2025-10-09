import api from '@/libs/api';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { type loginFormType } from '@/schemas/login';

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<AxiosError<{ type: string }> | null>(null);

  const handleLogin = async (credentials: loginFormType) => {
    try {
      setIsPending(true);
      const response = await api.post('/auth/login', credentials);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return { handleLogin, isPending, error };
};
