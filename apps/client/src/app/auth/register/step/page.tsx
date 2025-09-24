'use client';

import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';
import { StepNavigation, totalSteps } from '@/components/auth/StepNavigation';
import {
  StepOneCard,
  StepThreeCard,
  StepTwoCard,
} from '@/components/auth/AuthCard';
import { useState } from 'react';
import {
  AuthPageWrapper,
  StepCardWrapper,
} from '@/components/auth/AuthWrapper';
import { MotionButton } from '@/components/motions/motionButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type stepFormType } from '@/schemas/register';

export default function StepPage() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<'prev' | 'next'>('next');

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      step1: { pseudo: '', username: '' },
      step2: { newPassword: '', confirmPassword: '' },
      step3: {
        email: '',
      },
    },
  });

  return (
    <AuthPageWrapper>
      {/* header */}
      <AuthHeaderSwitch step={step} type="register" href="/auth/login" />
      {/* content */}
      <div
        className="flex flex-col justify-center items-center gap-1 
      w-full *:w-full md:*:w-2/3 lg:*:w-1/2 xl:*:w-[42%] transition-all duration-300 relative"
      >
        <div className="absolute left-8 !size-10 hidden lg:block">
          <MotionButton
            onClick={() => {
              setStep(step - 1);
              setDir('prev');
            }}
            className={cn(
              step <= 1 && 'opacity-0 pointer-events-none',
              'text-foreground/80 hover:text-foreground p-3'
            )}
          >
            <ChevronLeft className="size-10" />
          </MotionButton>
        </div>

        <StepNavigation
          setDir={setDir}
          dir={dir}
          setStep={setStep}
          step={step}
        />

        {/* Step Card */}
        <FormProvider {...form}>
          <StepCardWrapper
            key={step}
            initial={{ x: dir === 'next' ? 100 : -100, opacity: 0 }}
            exit={{ x: dir === 'next' ? -100 : 100, opacity: 0 }}
          >
            {step === 1 && <StepOneCard form={form} />}
            {step === 2 && <StepTwoCard form={form} />}
            {step === 3 && <StepThreeCard form={form} />}
          </StepCardWrapper>
        </FormProvider>

        <div className="absolute !size-10 right-14 hidden lg:block">
          <MotionButton
            onClick={() => {
              setStep(step + 1);
              setDir('next');
            }}
            className={cn(
              step >= totalSteps && 'opacity-0 pointer-events-none',
              'text-foreground/80 hover:text-foreground p-3'
            )}
          >
            <ChevronRight className="size-10" />
          </MotionButton>
        </div>
      </div>
    </AuthPageWrapper>
  );
}
