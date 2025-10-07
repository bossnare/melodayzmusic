'use client';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCheckField } from '@/hooks/useCheckField';
import { useLoadingPath } from '@/hooks/useLoadingPath';
import { EMAIL_REGEX, USERNAME_REGEX } from '@/libs/validators/regex';
import { type loginFormType } from '@/schemas/login';
import { type stepFormType } from '@/schemas/register';
import axios from 'axios';
import { Lock, Mail, NotebookPen, UserRoundPen } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MelodayzMusic } from '../branding/logo';
import { Button } from '../ui/button';
import { AuthCtaButton } from './AuthCtaButton';
import { StepCardWrapper } from './AuthWrapper';
import { PasswordInput, UsernameInput } from './CustomInput';
import { DatePicker } from './date-picker';
import { Divide } from './Divide';
import { Provider } from './Provider';
import { RadioGroup1 } from './radio-group1';
import { SelectScrollable } from './select-scrollable';

function Title({ children }: { children: React.ReactNode }) {
  return (
    <CardTitle className="flex items-center justify-center gap-2 text-base text-foreground">
      {children}
    </CardTitle>
  );
}

// login card
function LoginCard({
  form,
  handleLogin,
  isPending,
}: {
  form: UseFormReturn<loginFormType>;
  handleLogin: (credentials: loginFormType) => Promise<void>;
  isPending: boolean;
}) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname + 'login'}
          className="w-full lg:w-3/4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 35 }}
        >
          <Card className="p-3 space-y-4 rounded-3xl md:p-4 xl:p-6 dark:bg-gradient-to-br bg-gradient-to-b dark:from-card/40 dark:via-card/10 dark:to-card/40 dark:lg:to-card/80 from-card via-card/50 to-card backdrop-blur-sm">
            <CardTitle>
              <MelodayzMusic />
            </CardTitle>
            {/* Form Content */}
            <CardContent className="flex flex-col gap-3 p-1 md:gap-10 md:flex-row">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleLogin)}
                  className="flex flex-col flex-1 gap-3"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email ou nom d&apos;utilisateur</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            autoComplete="username"
                            spellCheck="false"
                            autoCorrect="off"
                            type="text"
                            className="py-[26px] border-[1.4px] md:py-6 rounded-lg"
                            placeholder="Email ou @username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <PasswordInput
                            autoComplete="current-password"
                            className="rounded-lg border-[1.4px] py-[26px] md:py-6"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <AuthCtaButton
                    size="xl"
                    type="submit"
                    isPending={isPending}
                    className="rounded-2xl"
                  >
                    Se connecter
                  </AuthCtaButton>
                  <div className="mx-auto md:mx-0">
                    <Button
                      type="button"
                      variant="link"
                      className="w-auto h-auto p-0 text-ring dark:text-muted-foreground font-montserrat"
                    >
                      Mot de passe oublié ?
                    </Button>
                  </div>
                </form>
              </Form>

              {/* divide */}
              <Divide />

              {/* login providers */}
              <Provider size="xl" />
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// register card
const RegisterCard = () => {
  const { isPending, handleClickTab } = useLoadingPath('/auth/register/step');

  return (
    <StepCardWrapper
      key="createWithChoice"
      initial={{ x: -100, opacity: 0 }}
      exit={{ x: 100, opacity: 0 }}
    >
      <h3 className="py-4 mb-2 text-base font-medium text-center text-foreground/80">
        Choisis ta façon de t&apos;inscrire
      </h3>
      <Card className="p-4 rounded-2xl bg-gradient-to-b lg:bg-gradient-to-br from-card/40 dark:via-card/10 via-transparent to-card/80 dark:lg:to-card/60 dark:to-card/40 backdrop-blur-sm md:p-8">
        <CardTitle className="pb-4">
          <MelodayzMusic />
        </CardTitle>

        <div className="flex flex-col gap-6 md:flex-row">
          <CardContent className="flex flex-col items-center justify-center gap-2 md:w-[45%]">
            <AuthCtaButton isPending={isPending} onClick={handleClickTab}>
              Créer avec Email
            </AuthCtaButton>
          </CardContent>

          {/* divide */}
          <Divide />
          <Provider />
        </div>
      </Card>
    </StepCardWrapper>
  );
};

const StepOneCard = ({
  form,
  isPending,
}: {
  form: UseFormReturn<stepFormType>;
  isPending?: boolean;
}) => {
  const [usernameVerified, setUsernameVerified] = useState(false);
  const [autocheckLoading, setAutocheckLoading] = useState(false);
  const { checkField, isChecking } = useCheckField();
  const username = form.getValues('step1.username');
  const validUsername = USERNAME_REGEX.test(username);

  useEffect(() => {
    if (!validUsername || username === '') return;

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setAutocheckLoading(true);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/username-check`,
          {
            username: username,
          },
          { signal: controller.signal }
        );
        const exist = await res.data.exist;
        if (exist) {
          setUsernameVerified(false);
        } else {
          setUsernameVerified(true);
        }
      } finally {
        setAutocheckLoading(false);
      }
    }, 0);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [username, validUsername]);

  // real-time ckecking
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleUsernameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    // check if invalid username
    debounceRef.current = setTimeout(async () => {
      if (!USERNAME_REGEX.test(value)) {
        setUsernameVerified(false);
        return;
      }
      const exist = await checkField('/auth/username-check', {
        username: value,
      });
      if (exist) {
        setUsernameVerified(false);
        setAutocheckLoading(false);
        form.setError('step1.username', {
          message:
            "Ce nom d'utilisateur est déjà pris, choisissez-en un autre.",
        });
      } else {
        setUsernameVerified(true);
      }
    }, 500);
  };

  return (
    <Card className="p-4 dark:bg-card/6 dark:backdrop-blur-sm">
      <Title>
        Crée ton identité <UserRoundPen className="size-4 lg:size-5" />{' '}
      </Title>
      {/* Form Content */}
      <CardContent className="flex flex-col p-1 md:flex-row">
        <Form {...form}>
          <div className="flex flex-col flex-1 gap-4">
            <FormField
              control={form.control}
              name="step1.pseudo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ton pseudo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      className="py-6"
                      spellCheck="false"
                      autoCorrect="off"
                      placeholder="VibeQueen"
                      {...field}
                      {...form.register('step1.pseudo')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="step1.username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identifiant unique</FormLabel>
                  <FormControl>
                    <UsernameInput
                      spellCheck="false"
                      autoCorrect="off"
                      disabled={isPending}
                      usernameVerified={usernameVerified}
                      validUsername={validUsername}
                      isPending={isChecking || autocheckLoading}
                      {...field}
                      {...form.register('step1.username')}
                      onChange={(e) => {
                        field.onChange(e);
                        handleUsernameChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Ton identifiant sera visible par tous.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

const StepTwoCard = ({
  form,
  isPending,
}: {
  form: UseFormReturn<stepFormType>;
  isPending?: boolean;
}) => {
  const { checkField, isChecking } = useCheckField();

  return (
    <Card className="p-4 dark:bg-card/6 dark:backdrop-blur-sm">
      <Title>
        Ton email, ton pass VIP <Mail className="size-4 lg:size-5" />
      </Title>
      {/* Form Content */}
      <CardContent className="flex flex-col p-1 md:flex-row">
        <Form {...form}>
          <div className="flex flex-col flex-1 gap-4">
            <FormField
              control={form.control}
              name="step2.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse email</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register('step2.email')}
                      {...field}
                      disabled={isPending}
                      type="email"
                      className="py-6"
                      placeholder="Entre ton email magique ✨"
                      spellCheck="false"
                      autoCorrect="off"
                      onChange={async (e) => {
                        field.onChange(e);
                        const { value } = e.target;
                        if (EMAIL_REGEX.test(value)) {
                          const exist = await checkField('/auth/email-check', {
                            email: value,
                          });
                          if (exist)
                            form.setError('step2.email', {
                              message:
                                'Oops ! Cette adresse est déjà utulisée, essayer une autre.',
                            });
                        }
                      }}
                    />
                  </FormControl>
                  {isChecking && (
                    <FormDescription className="flex gap-1 text-xs opacity-80">
                      <div className="size-[16px] border-2 border-foreground/50 border-t-transparent rounded-full animate-spin"></div>{' '}
                      vérification...
                    </FormDescription>
                  )}
                  <FormDescription className="text-xs">
                    Ton email sécurise ton compte et t&apos;identifie
                    facilement.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

const StepThreeCard = ({
  form,
  isPending,
}: {
  form: UseFormReturn<stepFormType>;
  isPending?: boolean;
}) => {
  return (
    <Card className="p-4 dark:bg-card/6 dark:backdrop-blur-sm">
      <Title>
        Un mot de passe qui suit ton rythme{' '}
        <Lock className="size-4 lg:size-5" />
      </Title>
      {/* Form Content */}
      <CardContent className="flex flex-col p-1 md:flex-row">
        <Form {...form}>
          <div className="flex flex-col flex-1 gap-4">
            <FormField
              control={form.control}
              name="step3.password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...form.register('step3.password')}
                      disabled={isPending}
                      autoComplete="new-password"
                      spellCheck="false"
                      autoCorrect="off"
                      placeholder="Crée ton mot de passe en béton"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="step3.confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmation</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...form.register('step3.confirmPassword')}
                      disabled={isPending}
                      autoComplete="new-password"
                      placeholder="Confirme ton mot de passe en béton"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

const StepFourCard = ({
  form,
  isPending,
}: {
  form: UseFormReturn<stepFormType>;
  isPending?: boolean;
}) => {
  return (
    <Card className="p-4 dark:bg-card/6 dark:backdrop-blur-sm">
      <Title>
        Un peu plus sur toi <NotebookPen className="size-4 lg:size-5" />
      </Title>
      {/* Form Content */}
      <CardContent className="flex flex-col p-1 md:flex-row">
        <Form {...form}>
          <div className="flex flex-col flex-1 gap-5">
            <div className="flex flex-col gap-4 items-start sm:gap-6 sm:flex-row">
              <FormField
                control={form.control}
                name="step4.birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de naissance</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChangeAction={field.onChange}
                        isPending={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* country */}
              <FormField
                control={form.control}
                name="step4.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vous venez de quel pays ?</FormLabel>
                    <FormControl>
                      <SelectScrollable
                        value={field.value}
                        onChange={field.onChange}
                        isPending={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            {/* Genre */}
            <FormField
              control={form.control}
              name="step4.genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quel est votre genre ?</FormLabel>
                  <FormControl>
                    <RadioGroup1
                      onChange={field.onChange}
                      value={field.value}
                      className="flex"
                      isPending={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export {
  LoginCard,
  RegisterCard,
  StepFourCard,
  StepOneCard,
  StepThreeCard,
  StepTwoCard,
};
