'use client';

import {
  AuthPageWrapper,
  StepCardWrapper,
} from '@/components/auth/AuthWrapper';
import { Spinner } from '@/components/ui/spinner';
import { Music2, PartyPopper } from 'lucide-react';

export default function CongratulationPage() {
  return (
    <AuthPageWrapper>
      <h3 className="font-poppins font-bold text-3xl flex flex-col gap-2 items-center mt-5">
        <PartyPopper className="size-10" />
        C&apos;est fini !
        <Music2 />
      </h3>

      <StepCardWrapper
        key="congatulations"
        initial={{ x: -100, opacity: 0 }}
        exit={{ x: 100, opacity: 0 }}
        className="w-[90%] md:!w-[80%] flex flex-col items-center"
      >
        <p>Congratulations ❇️🫂</p>
        <span className="mt-5 flex gap-2">
          <Spinner className="size-6" /> Attends...
        </span>
      </StepCardWrapper>
    </AuthPageWrapper>
  );
}
