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
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MelodayzMusic } from '../branding/logo';
import { AuthCtaButton } from './AuthCtaButton';
import { PasswordInput } from './PasswordInput';
import { Provider } from './Provider';
import { StepCardWrapper } from './AuthWrapper';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function LoginCard() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname + 'login'}
          className="w-full lg:w-3/4"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Card className="p-4 space-y-4 md:p-6 bg-gradient-to-br from-card/40 via-card/10 to-card/90">
            <CardTitle>
              <MelodayzMusic />
            </CardTitle>
            {/* Form Content */}
            <CardContent className="flex flex-col gap-6 p-1 md:gap-10 md:flex-row">
              <Form {...form}>
                <form action="" className="flex flex-col flex-1 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail ou nom d&apos;utilisateur</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            className="py-6"
                            placeholder="E-mail ou @username"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription />
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
                          <PasswordInput {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <AuthCtaButton>Se connecter</AuthCtaButton>
                </form>
              </Form>

              {/* divide */}
              <div className="flex items-center justify-center gap-2 md:flex-col">
                <div className="bg-border h-[1px] md:w-[1px] grow"></div>
                <span className="text-muted-foreground">ou</span>
                <div className="bg-border h-[1px] md:w-[1px] grow"></div>
              </div>

              {/* login providers */}
              <Provider />
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// register card
const StepOneCard = () => {
  const form = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      pseudo: '',
      username: '',
    },
  });

  return (
    <StepCardWrapper key="step1">
      <Card className="p-4 dark:bg-transparent lg:p-5">
        <CardTitle className="text-base text-center">
          Crée ton identité
        </CardTitle>
        {/* Form Content */}
        <CardContent className="flex flex-col p-1 md:flex-row">
          <Form {...form}>
            <form action="" className="flex flex-col flex-1 gap-5">
              <FormField
                control={form.control}
                name="pseudo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ton pseudo</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="py-6"
                        placeholder="VibeQueen"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identifiant unique</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="@vibequeen848"
                        type="text"
                        className="py-6"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Ton identifiant sera visible par tous
                    </FormDescription>{' '}
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <AuthCtaButton>Continuer</AuthCtaButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </StepCardWrapper>
  );
};

const StepTwoCard = () => {
  const form = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <StepCardWrapper key="step2">
      <Card className="p-4 dark:bg-transparent lg:p-5">
        <CardTitle className="text-base text-center">
          Un mot de passe qui suit ton rythme
        </CardTitle>
        {/* Form Content */}
        <CardContent className="flex flex-col p-1 md:flex-row">
          <Form {...form}>
            <form action="" className="flex flex-col flex-1 gap-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Crée ton mot de passe en béton"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmation</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirme ton mot de passe en béton"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription> <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <AuthCtaButton>Continuer</AuthCtaButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </StepCardWrapper>
  );
};

const StepThreeCard = () => {
  const form = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <StepCardWrapper key="step3">
      <Card className="p-4 dark:bg-transparent lg:p-5">
        <CardTitle className="text-base text-center">Votre e-mail</CardTitle>
        {/* Form Content */}
        <CardContent className="flex flex-col p-1 md:flex-row">
          <Form {...form}>
            <form action="" className="flex flex-col flex-1 gap-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="py-6"
                        placeholder="Entez e-mail lié à ce compte"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              {/* <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmation</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirme ton mot de passe en béton"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription> <FormMessage />
                  </FormItem>
                )}
              ></FormField> */}
              <AuthCtaButton>Continuer</AuthCtaButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </StepCardWrapper>
  );
};

export { LoginCard, StepOneCard, StepTwoCard, StepThreeCard };
