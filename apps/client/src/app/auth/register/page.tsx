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
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function RegisterPage() {
  const form = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  return (
    <>
      <AuthHeaderSwitch type="register" href="/auth/login" />
      <div className="flex items-center flex-col justify-center gap-2 *:w-full *:p-4 lg:*:p-6 md:*:w-2/3 lg:*:w-[42%]">
        <div className="flex items-center justify-between gap-4 capitalize pt-14 md:pt-4">
          <MotionButton>
            <ChevronLeft className="size-8" />
          </MotionButton>
          <span className="text-lg font-medium">étape 1</span>
          <MotionButton>
            <ChevronRight className="size-8" />
          </MotionButton>
        </div>
        <Card className="dark:bg-transparent">
          <CardTitle className="text-lg text-center">
            Crée ton identité
          </CardTitle>
          {/* Form Content */}
          <CardContent className="flex flex-col gap-8 p-1 md:gap-10 md:flex-row">
            <Form {...form}>
              <form action="" className="flex flex-col flex-1 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
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
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identifiant unique</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="@flowpower8k"
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
