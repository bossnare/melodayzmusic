'use client';

import {
  AuthPageWrapper,
  StepCardWrapper,
} from '@/components/auth/AuthWrapper';
import { Music2, PartyPopper, CircleCheck } from 'lucide-react';
import { AuthCtaButton } from '@/components/auth/AuthCtaButton';

export default function CongratulationPage() {
  return (
    <AuthPageWrapper>
      <StepCardWrapper
        key="congatulations"
        initial={{ x: -100, opacity: 0 }}
        exit={{ x: 100, opacity: 0 }}
        className="!w-[90%] md:!w-[40%] flex flex-col"
      >
        <h2 className="font-montserrat font-bold text-3xl flex flex-col gap-2 items-center mt-5">
          <PartyPopper className="size-10" />
          C&apos;est fini !
          <Music2 />
        </h2>
        <div className="mt-16">
          <h3 className="text-2xl flex items-center font-montserrat font-medium gap-2">
            Félicitations !{' '}
            <span className="text-chart-2">
              <CircleCheck />
            </span>
          </h3>
          <p className="mt-4">
            Ton compte{' '}
            <span className="font-bold font-montserrat">MelodayzMusic</span> a
            été créé avec succès.
          </p>
          <p>Découvre maintenant ta vibe musicale !</p>
        </div>
        <div className="mt-14 ml-auto md:ml-0">
          <AuthCtaButton>Continuer</AuthCtaButton>
        </div>
      </StepCardWrapper>
    </AuthPageWrapper>
  );
}
