'use client';

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
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { providerLabels } from '@/components/navigation/labels/label.provider';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { MotionButton } from '@/components/motions/motionButton';
import { AuthHeaderSwitch } from './AuthHeaderSwitch';
import { MelodayzMusic } from '../branding/logo';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
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
    <section className="flex items-center flex-col justify-between gap-2 h-full pb-6 md:pb-4">
      {/* Header */}
      <AuthHeaderSwitch href="/auth/register" type="login" />

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
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
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            className="py-6"
                            placeholder="vous@exemple.com"
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
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              className="py-6"
                              {...field}
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2">
                              <MotionButton
                                type="button"
                                className="*:!size-5 lg:*:!size-4"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                              </MotionButton>
                            </span>
                          </div>
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
              <ul className="px-2 space-y-3 md:flex md:justify-center md:items-center md:flex-col md:flex-1 md:p-0">
                {providerLabels.map((provider) => (
                  <li key={provider.id}>
                    <Button
                      variant="secondary"
                      className="w-full rounded-full md:w-auto"
                    >
                      {provider.label === 'Google' ? (
                        <Image
                          src={provider.icon as string}
                          alt={provider.label}
                          className="w-4 lg:w-5"
                          height={500}
                          width={500}
                        />
                      ) : (
                        provider.icon
                      )}
                      Continuer avec {provider.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      {/* Sign up */}
      <div className="text-xs">Feel the Beat, Anywhere You Go.</div>
    </section>
  );
}

export { LoginCard };
