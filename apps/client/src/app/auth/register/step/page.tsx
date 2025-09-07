'use client';

import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';
import { StepNavigation } from '@/components/auth/StepNavigation';
import {
  StepOneCard,
  StepThreeCard,
  StepTwoCard,
} from '@/components/auth/AuthCard';
import { useState } from 'react';
import { AuthPageWrapper } from '@/components/auth/AuthWrapper';

export default function StepPage() {
  const [step, setStep] = useState(1);

  return (
    <AuthPageWrapper>
      {/* header */}
      <AuthHeaderSwitch step={step} type="register" href="/auth/login" />
      {/* content */}
      <div
        className="flex flex-col justify-center items-center gap-1 
      w-full *:w-full md:*:w-2/3 lg:*:w-[42%]"
      >
        <StepNavigation setStep={setStep} step={step} />
        {/* Step Card */}
        {step === 1 && <StepOneCard />}
        {step === 2 && <StepTwoCard />}
        {step === 3 && <StepThreeCard />}
      </div>
    </AuthPageWrapper>
  );
}
