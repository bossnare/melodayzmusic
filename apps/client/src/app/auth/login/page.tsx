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
import { DialogCloseButton } from '@/components/auth/DialogCloseButton';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { vibrate } from '@/utils/vibration';

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false);
  const [isErrorCredentials, setIsErrorCredentials] = useState(false);
  // const [isErrorPassword, setIsErrorPassword] = useState(false);

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
        const res = error.response;
        console.log(error);

        const unauthorized =
          res?.data.type === 'account' || res?.data.type === 'password';

        if (error && !unauthorized) {
          vibrate('medium');
          toast('Oups!', {
            description: (
              <span className="text-destructive">
                {error.message}
                {error.code === 'ERR_NETWORK' && ', vérifier votre réseau.'}
              </span>
            ),
            action: {
              label: <X className="py-1" />,
              onClick: () => null,
            },
          });
        }

        if (unauthorized) {
          setIsErrorCredentials(true);
          vibrate('soft');
        }

        // if (res?.type === 'password') {
        //   setIsErrorPassword(true);
        // }
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AuthPageWrapper>
      {/* Header */}
      <AuthHeaderSwitch href="/auth/register" type="login" />
      {/* dialog for account */}
      <DialogCloseButton
        open={isErrorCredentials}
        onOpenChange={() => setIsErrorCredentials(false)}
        title="Identifiants invalides"
        description="Oups ! La combinaison email et mot se passe est incorrecte. Vérifie et réessaye."
        close="D'accord"
      />
      {/* password dialog */}
      {/* <DialogCloseButton
        open={isErrorPassword}
        onOpenChange={() => setIsErrorPassword(false)}
        title="Erreur mot de passe"
        description="Le mot de passe est incorrect. Veuillez réessayer."
        close="D'accord"
      /> */}
      {/* card */}
      <LoginCard form={form} isPending={loading} handleLogin={handleLogin} />
    </AuthPageWrapper>
  );
}
