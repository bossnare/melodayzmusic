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
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type stepFormType } from '@/schemas/register';
import { AuthCtaButton } from '@/components/auth/AuthCtaButton';
import { useDebounce } from 'use-debounce';
import { checkField } from '@/libs/auth/check-field';

const stepFields: Record<number, 'step1' | 'step2' | 'step3'> = {
  1: 'step1',
  2: 'step2',
  3: 'step3',
};

export default function StepPage() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<'prev' | 'next'>('next');
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      step1: { pseudo: '', username: '' },
      step2: { email: '' },
      step3: {
        password: '',
        confirmPassword: '',
      },
    },
  });

  const handleClickNext = async () => {
    const isValidStep = await form.trigger(stepFields[step]);

    let canNext = isValidStep;

    if (step === 1) {
      const username = form.getValues('step1.username');
      const { exist } = await checkField('/auth/username-check', { username });
      if (exist) {
        form.setError('step1.username', {
          message: "Ce nom d'utilisateur est déjà pris.",
        });
        canNext = false;
      }
    }

    if (step === 2) {
      const email = form.getValues('step2.email');
      const { exist } = await checkField('/auth/email-check', { email });
      if (exist) {
        form.setError('step2.email', {
          message: 'Cette adresse est déjà utilisée.',
        });
        canNext = false;
      }
    }

    if (step < totalSteps && canNext) {
      setIsLoadingNext(true);
      setTimeout(() => {
        setStep((step) => step + 1);
        setDir('next');
        setIsLoadingNext(false);
      }, 1000);
    }
  };

  // const { formState } = useFormContext();

  return (
    <AuthPageWrapper>
      {/* header */}
      <AuthHeaderSwitch
        step={step}
        dir={dir}
        type="register"
        href="/auth/login"
      />
      {/* content */}
      <div
        className="flex flex-col justify-center items-center gap-1 
      w-full *:w-full md:*:w-2/3 lg:*:w-1/2 xl:*:w-[42%] min-h-[50%] md:min-h-[65%] transition-all duration-300 relative"
      >
        <div className="absolute left-8 !size-10 hidden lg:block">
          <MotionButton
            onClick={() => {
              setStep((step) => step - 1);
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
          <form
            action=""
            className="flex flex-col justify-between space-y-3 grow"
          >
            <StepCardWrapper
              key={step}
              initial={{ x: dir === 'next' ? 100 : -100, opacity: 0 }}
              exit={{ x: dir === 'next' ? -100 : 100, opacity: 0 }}
            >
              {step === 1 && <StepOneCard form={form} />}
              {step === 2 && <StepTwoCard form={form} />}
              {step === 3 && <StepThreeCard form={form} />}
            </StepCardWrapper>
            <AuthCtaButton
              isPending={isLoadingNext}
              onClick={handleClickNext}
              type={step >= totalSteps ? 'submit' : 'button'}
              className="mx-auto rounded-full w-8/9 sm:w-2/3"
            >
              {step >= totalSteps ? 'Créer mon compte' : 'Suivant'}
            </AuthCtaButton>
          </form>
        </FormProvider>
      </div>
    </AuthPageWrapper>
  );
}
