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
import { X, CircleAlert } from 'lucide-react';
import { vibrate } from '@/utils/vibration';
import { Button } from '@/components/ui/button';
import { USERNAME_REGEX, EMAIL_REGEX } from '@/libs/validators/regex';

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

  // identifier
  const identifier = form.getValues('email');
  const looksLikeEmail = EMAIL_REGEX.test(identifier);
  const looksLikeUsername = USERNAME_REGEX.test(identifier);

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
          toast.custom((t) => (
            <div className="relative flex gap-4 items-center bg-destructive-soft text-destructive-soft-foreground shadow-lg p-3 rounded-xl border border-destructive-soft/80">
              <div className="h-full text-destructive inset-y-0 flex items-center justify-center">
                <CircleAlert />
              </div>
              <div className="flex flex-col grow">
                <span className="font-medium text-sm">Oups!</span>
                <span className="text-sm">
                  {error.message}
                  {error.code === 'ERR_NETWORK' && ', vérifier votre réseau.'}
                </span>
              </div>

              <Button
                onClick={() => toast.dismiss(t)}
                variant="ghost"
                size="icon"
                className="hover:text-inherit"
              >
                <X className="size-4" />
              </Button>
            </div>
          ));
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
    <AuthPageWrapper isPending={loading} textLoading="Connexion...">
      {/* Header */}
      <AuthHeaderSwitch href="/auth/register" type="login" />
      {/* dialog for account */}
      <DialogCloseButton
        open={isErrorCredentials}
        onOpenChange={() => setIsErrorCredentials(false)}
        title="Identifiants invalides"
        description={`Oups ! La combinaison ${looksLikeEmail ? 'email' : ''}${
          looksLikeUsername ? "nom d'utilisateur" : ''
        } et mot de passe est incorrecte. Vérifie et réessaye.`}
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
