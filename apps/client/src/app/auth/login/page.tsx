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
import { motion } from 'motion/react';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const providerLabels = [
  {
    id: 1,
    label: 'Google',
    icon: '/icons/google.svg',
  },
  {
    id: 2,
    label: 'Facebook',
    icon: (
      <svg
        fill="#0866FF"
        role="img"
        className="size-4 lg:size-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Facebook</title>
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
      </svg>
    ),
  },
  {
    id: 3,
    label: 'TikTok',
    icon: (
      <svg
        fill="#000000"
        role="img"
        className="size-4 lg:size-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>TikTok</title>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

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
  return (
    <motion.div
      className="md:w-3/4 w-full"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
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
          <span className="text-[18px] md:text-xl font-bold font-poppins">
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
                        placeholder="you@example.com"
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
                className="rounded-full cta relative overflow-hidden"
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
          <div className="flex md:flex-col items-center justify-center gap-2">
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
  );
}
