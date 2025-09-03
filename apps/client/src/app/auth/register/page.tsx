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
import { providerLabels } from '@/components/navigation/labels/label.provider';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { MotionButton } from '@/components/motions/motionButton';
import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';

export default function RegisterPage() {
  const form = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <AuthHeaderSwitch type="register" href="/auth/login" />
      <div className="h-dvh flex items-center gap-2 *:w-full *:p-4 *:h-2/3">
        <Card>
          <CardTitle className="text-center text-lg">
            Entrez vos infos d&apos;accès
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
                          <Input className="py-6" {...field} />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2">
                            {/* <MotionButton
                            type="button"
                            className="*:!size-5 lg:*:!size-4"
                          ></MotionButton> */}
                          </span>
                        </div>
                      </FormControl>
                      <FormDescription />
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

        {/* <Card>
          <CardTitle></CardTitle>
          <CardContent></CardContent>
        </Card>

        <Card>
          <CardTitle></CardTitle>
          <CardContent></CardContent>
        </Card> */}
      </div>
    </>
  );
}
