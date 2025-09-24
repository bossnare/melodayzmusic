'use client';

import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';
import { StepNavigation } from '@/components/auth/StepNavigation';
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

export default function StepPage() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<'prev' | 'next'>('next');

  return (
    <AuthPageWrapper>
      {/* header */}
      <AuthHeaderSwitch step={step} type="register" href="/auth/login" />
      {/* content */}
      <div
        className="flex flex-col justify-center items-center gap-1 
      w-full *:w-full md:*:w-2/3 lg:*:w-[42%] transition-all duration-300"
      >
        <StepNavigation
          setDir={setDir}
          dir={dir}
          setStep={setStep}
          step={step}
        />
        {/* Step Card */}
        <StepCardWrapper
          key={step}
          initial={{ x: dir === 'next' ? 100 : -100, opacity: 0 }}
          exit={{ x: dir === 'next' ? -100 : 100, opacity: 0 }}
        >
          {step === 1 && <StepOneCard />}
          {step === 2 && <StepTwoCard />}
          {step === 3 && <StepThreeCard />}
        </StepCardWrapper>
        {/* <StepCardWrapper
          key={step + 2}
          initial={{ x: dir === 'next' ? 100 : -100, opacity: 0 }}
          exit={{ x: dir === 'next' ? -100 : 100, opacity: 0 }}
        >
          
        </StepCardWrapper>
        <StepCardWrapper
          key={step + 3}
          initial={{ x: dir === 'next' ? 100 : -100, opacity: 0 }}
          exit={{ x: dir === 'next' ? -100 : 100, opacity: 0 }}
        >
          
        </StepCardWrapper> */}
      </div>
    </AuthPageWrapper>
  );
}
