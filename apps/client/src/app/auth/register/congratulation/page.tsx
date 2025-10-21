'use client';

import {
  AuthPageWrapper,
  StepCardWrapper,
} from '@/components/auth/AuthWrapper';
import { Music2, Music, PartyPopper, CircleCheck } from 'lucide-react';
import { AuthCtaButton } from '@/components/auth/AuthCtaButton';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/libs/api';
import { AxiosError } from 'axios';
import Image from 'next/image';

export default function CongratulationPage() {
  const tempData = JSON.parse(sessionStorage.getItem('tempAuth') || 'null');
  const [isLoading, startTransition] = useTransition();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const pending = isLoading || isPending;

  const handleLogin = async () => {
    if (!tempData) return;
    const expiresAt = tempData?.expiresAt;
    const credentials = {
      email: tempData?.email,
      password: tempData?.password,
    };
    try {
      setIsPending(true);
      const res = await api.post('/auth/login', credentials);
      if (res.data.success) {
        // store token
        localStorage.setItem('access_token', res.data.access_token);
        sessionStorage.removeItem('tempAuth');
        // redirect to dashboard
        startTransition(() => {
          router.replace('/dashboard');
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response;
        console.log(error);
        alert(error?.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AuthPageWrapper isPending={pending} textLoading="Préparation...">
      <StepCardWrapper
        key="congatulations"
        initial={{ x: 100, opacity: 0 }}
        exit={{ x: -100, opacity: 0 }}
        className="!w-[90%] lg:!w-[40%] flex flex-col"
      >
        <div className="flex flex-col items-center gap-2 mt-5 px-2">
          <div className="flex items-center gap-1">
            <PartyPopper className="size-10" />
            <Music2 className="size-8" />
          </div>
          <h2 className="text-3xl font-bold font-montserrat">
            C&apos;est fini !
          </h2>
        </div>
        <div className="mt-14">
          <Image
            src="/icons/icon_x32_color.svg"
            alt="MelodayzMusic"
            className="size-18 lg:size-20 mb-2"
            width={1000}
            height={1000}
          />
          <h3 className="flex items-center gap-2 text-2xl font-medium font-montserrat">
            Félicitations !{' '}
            <span className="text-white rounded-full bg-chart-2">
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
        <div className="mr-auto mt-14 active:bg-muted">
          <AuthCtaButton onClick={handleLogin}>
            Commence à vibrer <Music />
          </AuthCtaButton>
        </div>
      </StepCardWrapper>
    </AuthPageWrapper>
  );
}
