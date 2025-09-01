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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
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
    <>
      {/* Sign up */}
      <div className="flex items-center justify-between w-full gap-12 py-3">
        <p className="text-sm">Vos vibes n’attendent que vous.</p>
        <Button variant="outline" size="lg" className="rounded-full">
          Créer un compte
        </Button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className="w-full lg:w-3/4"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          // transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Card className="p-4 space-y-4 md:p-6 ">
            <CardTitle className="flex items-center justify-center gap-1">
              <Image
                src="/icons/icon_512x512.png"
                className="w-6 dark:invert md:w-7"
                alt="meloicon"
                height={1000}
                width={1000}
              />
              <span className="text-[18px] select-none hover:text-primary-foreground/90 md:text-xl font-bold font-poppins">
                MelodayzMusic
              </span>
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
                          <Input type="password" className="py-6" {...field} />
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
      <div className="sticky bottom-15 md:bottom-4 inset-x-0 text-center text-xs">
        Feel the Beat, Anywhere You Go.
      </div>
    </>
  );
}
