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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const providerLabels = [
  {
    id: 1,
    label: 'google',
    icon: '/icons/google.svg',
    color: '#4285F4',
  },
  {
    id: 2,
    label: 'facebook',
    icon: '/icons/facebook.svg',
    color: '#0866FF',
  },
  {
    id: 3,
    label: 'tiktok',
    icon: '/icons/tiktok.svg',
    color: '#0866FF',
  },
];

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <Card className="w-full p-4 space-y-4 md:p-6 md:w-3/4">
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="py-5 lg:py-6"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="py-5 lg:py-6"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button className="cta" disabled={true} type="submit">
              Se connecter
            </Button>
          </form>
        </Form>

        {/* divide */}
        <div className="bg-border h-[1px] md:w-[1px] md:h-auto"></div>

        {/* login providers */}
        <ul className="px-2 space-y-3 md:flex md:justify-center md:items-center md:flex-col md:flex-1 md:p-0">
          {providerLabels.map((provider) => (
            <li key={provider.id}>
              <Button
                variant="secondary"
                className="w-full rounded-full md:w-auto"
              >
                <Image
                  src={provider.icon}
                  className="w-4"
                  alt={provider.label}
                  height={500}
                  width={500}
                />{' '}
                Continuer avec {provider.label}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
