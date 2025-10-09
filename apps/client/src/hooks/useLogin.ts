import api from '@/libs/api';
import { AxiosError } from 'axios';
import { type loginFormType } from '@/schemas/login';
import { useState } from 'react';

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<AxiosError<{ type: string }> | null>(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (credentials: loginFormType) => {
    try {
      setIsPending(true);
      const res = await api.post('/auth/login', credentials);
      if (res.data.success) {
         // store token
      localStorage.setItem('access_token', res.data.access_token);
        setSuccess(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return { handleLogin, isPending, success, error };
};
