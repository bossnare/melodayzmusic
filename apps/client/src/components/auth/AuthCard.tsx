import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { AuthHeaderSwitch } from './AuthHeaderSwitch';
import { MelodayzMusic } from '../branding/logo';
import { Tagline } from '../branding/tagline';
import { Provider } from './Provider';
import { PasswordInput } from './PasswordInput';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function LoginCard() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const pathname = usePathname();

  return (
    <section className="flex flex-col items-center justify-between gap-2 pb-6 h-dvh md:pb-4">
      {/* Header */}
      <AuthHeaderSwitch href="/auth/register" type="login" />

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname + 'login'}
          className="w-full lg:w-3/4"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Card className="p-4 space-y-4 md:p-6 ">
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
                  <Button
                    onClick={handleClick}
                    size="lg"
                    className="relative overflow-hidden rounded-full cta"
                    type="submit"
                  >
                    Se connecter
                    {/* grain overlay */}
                    <span
                      className="absolute inset-0 opacity-20 pointer-events-none 
               mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
                    ></span>
                  </Button>
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
      {/* Sign up */}
      <Tagline />
    </section>
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
    <AnimatePresence mode="wait">
      <motion.div
        key={'step1'}
        className="w-full lg:w-3/4"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
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
                        <div className="relative">
                          <Input
                            placeholder="@vibequeen848"
                            type="text"
                            className="py-6"
                            {...field}
                          />
                          <span className="absolute -translate-y-1/2 right-4 top-1/2">
                            {/* <MotionButton
                            type="button"
                            className="*:!size-5 lg:*:!size-4"
                          ></MotionButton> */}
                          </span>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Ton identifiant sera visible par tous
                      </FormDescription>{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <Button
                  // onClick={handleClick}
                  size="lg"
                  className="relative overflow-hidden rounded-full cta"
                  type="submit"
                >
                  Continuer
                  {/* grain overlay */}
                  <span
                    className="absolute inset-0 opacity-20 pointer-events-none 
                         mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
                  ></span>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

const StepTwoCard = () => {
  const form = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={'step2'}
        className="w-full lg:w-3/4"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
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
                          placeholder="Crée ton mot de passe béton"
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
                  name="repeatPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmation</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Confirme ton mot de passe béton"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription> <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <Button
                  // onClick={handleClick}
                  size="lg"
                  className="relative overflow-hidden rounded-full cta"
                  type="submit"
                >
                  Continuer
                  {/* grain overlay */}
                  <span
                    className="absolute inset-0 opacity-20 pointer-events-none 
                         mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
                  ></span>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export { LoginCard, StepOneCard, StepTwoCard };
