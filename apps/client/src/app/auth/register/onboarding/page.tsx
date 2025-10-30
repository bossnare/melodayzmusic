'use client';

import {
  StepFourCard,
  StepOneCard,
  StepThreeCard,
  StepTwoCard,
} from '@/components/auth/AuthCard';
import { AuthCtaButton } from '@/components/auth/AuthCtaButton';
import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';
import {
  AuthPageWrapper,
  StepCardWrapper,
} from '@/components/auth/AuthWrapper';
import { StepNavigation, totalSteps } from '@/components/auth/StepNavigation';
import { MotionButton } from '@/components/motions/motionButton';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCheckField } from '@/hooks/useCheckField';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import { EMAIL_REGEX, USERNAME_REGEX } from '@/lib/validators/regex';
import { registerSchema, type stepFormType } from '@/schemas/register';
import { vibrate } from '@/utils/vibration';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const stepFields: Record<number, 'step1' | 'step2' | 'step3'> = {
  1: 'step1',
  2: 'step2',
  3: 'step3',
};

export default function StepPage() {
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
      step4: {
        birthday: '',
        country: '',
        genre: 'homme',
      },
    },
  });

  const [step, setStep] = useState(
    process.env.NODE_ENV === 'development' ? 4 : 1
  );
  const [dir, setDir] = useState<'prev' | 'next'>('next');
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const { checkField, isChecking } = useCheckField();
  const [isPending, startTransition] = useTransition();
  const pending = isLoadingNext || isChecking || registerLoading || isPending;
  const router = useRouter();
  const finalStep = step >= totalSteps - 1;
  const textLoading = finalStep ? 'Création du compte...' : 'Un instant...';
  const isMobile = useIsMobile();

  const handleRegister = async (data: stepFormType) => {
    // fletten data
    const payload = {
      pseudo: data.step1.pseudo,
      username: data.step1.username,
      email: data.step2.email,
      password: data.step3.password,
      birthday: data.step4.birthday,
      country: data.step4.country,
      genre: data.step4.genre,
    };
    try {
      setRegisterLoading(true);
      const res = await api.post('/auth/register', payload);
      if (res.data) {
        const expiresAt = Date.now() + 15 * 60 * 1000;
        sessionStorage.setItem(
          'tempAuth',
          JSON.stringify({
            email: payload.email,
            password: payload.password,
            expiresAt,
          })
        );
        startTransition(() => {
          router.replace('/auth/register/congratulation');
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error?.message);
      }
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleClickNext = async () => {
    const isValidStep = await form.trigger(stepFields[step]);

    let canNext = isValidStep;

    if (step === 1) {
      const username = form.getValues('step1.username');
      if (!USERNAME_REGEX.test(username)) return;
      const exist = await checkField('/auth/username-check', { username });
      if (exist) {
        form.setError('step1.username', {
          message:
            "Ce nom d'utilisateur est déjà pris, choisissez-en un autre.",
        });
        canNext = false;
      }
    }

    if (step === 2) {
      const email = form.getValues('step2.email');
      if (!EMAIL_REGEX.test(email)) return;
      const exist = await checkField('/auth/email-check', { email });
      if (exist) {
        form.setError('step2.email', {
          message: 'Oops ! Cette adresse est déjà utulisée, essayer une autre.',
        });
        canNext = false;
      }
    }

    if (step === 3) {
      const password = form.getValues('step3.password');
      const confirmPassword = form.getValues('step3.confirmPassword');
      if (confirmPassword !== password) {
        form.setError('step3.confirmPassword', {
          message: 'Oops ! Les mots de passe ne correspondent pas.',
        });
        canNext = false;
      }
    }

    if (step < totalSteps - 1 && canNext) {
      setIsLoadingNext(true);
      setTimeout(() => {
        setStep((step) => step + 1);
        setDir('next');
        setIsLoadingNext(false);
        vibrate('subtle');
      }, 600);
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
      w-full px-2 md:px-10 *:w-full md:*:w-3/4 lg:*:w-1/2 xl:*:w-[42%] min-h-[50%] sm:min-h-auto xl:min-h-[60%] transition-all duration-300 relative"
      >
        <div className="absolute left-8 size-10! hidden lg:block">
          <MotionButton
            onClick={() => {
              setStep((step) => step - 1);
              setDir('prev');
              setTimeout(() => {
                vibrate('low');
              }, 200);
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
            className="flex flex-col justify-between space-y-3"
            onSubmit={form.handleSubmit(handleRegister)}
          >
            <StepCardWrapper
              key={step}
              initial={{ x: dir === 'next' ? 100 : -100, opacity: 0 }}
              exit={{ x: dir === 'next' ? -100 : 100, opacity: 0 }}
            >
              {step === 1 && <StepOneCard isPending={pending} form={form} />}
              {step === 2 && <StepTwoCard isPending={pending} form={form} />}
              {step === 3 && <StepThreeCard isPending={pending} form={form} />}
              {step === 4 && <StepFourCard isPending={pending} form={form} />}
            </StepCardWrapper>
            <AuthCtaButton
              textLoading={textLoading}
              isPending={pending}
              onClick={handleClickNext}
              type={finalStep ? 'submit' : 'button'}
              size={isMobile ? 'xl' : 'lg'}
              className="mx-auto rounded-full w-8/9 sm:w-2/3 transition-none!"
            >
              {finalStep ? 'Créer mon compte' : 'Suivant'}
            </AuthCtaButton>
          </form>
        </FormProvider>
      </div>
    </AuthPageWrapper>
  );
}
