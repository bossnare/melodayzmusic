'use client';

import { LoginCard } from '@/components/auth/AuthCard';
import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';
import { AuthPageWrapper } from '@/components/auth/AuthWrapper';
import { loginSchema, type loginFormType } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DialogCloseButton } from '@/components/auth/DialogCloseButton';
import { toast } from 'sonner';
import { X, CircleAlert } from 'lucide-react';
import { vibrate } from '@/utils/vibration';
import { Button } from '@/components/ui/button';
import { USERNAME_REGEX, EMAIL_REGEX } from '@/libs/validators/regex';
import { useLogin } from '@/hooks/useLogin';

export default function LoginPage() {
  const [isErrorCredentials, setIsErrorCredentials] = useState(false);
  const { handleLogin, isPending, isSwitching, error } = useLogin();
  const loading = isPending || isSwitching;

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

  const onSubmit = async (credentials: loginFormType) => {
    await handleLogin(credentials);

  const resError = error?.response?.data;
  console.log(error);

  const unauthorized =
    resError?.type === 'account' || resError?.type === 'password';

  if (unauthorized) {
    setIsErrorCredentials(true);
    vibrate('soft');
  }

  if (error && !unauthorized) {
    vibrate('medium');
    toast.custom((t) => (
      <div className="relative flex items-center gap-4 p-3 border shadow-lg bg-destructive-soft text-destructive-soft-foreground rounded-xl border-destructive-soft/80">
        <div className="inset-y-0 flex items-center justify-center h-full text-destructive">
          <CircleAlert />
        </div>
        <div className="flex flex-col grow">
          <span className="text-sm font-medium">Oups!</span>
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
   };

  return (
    <AuthPageWrapper isPending={loading}>
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
      {/* card */}
      <LoginCard form={form} isPending={loading} handleLogin={onSubmit} />
    </AuthPageWrapper>
  );
}
