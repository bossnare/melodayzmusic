'use client';

import { isValidToken } from '@/libs/auth/isValidToken';
import type { BaseProps } from '@/types/base.interface';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import WaveLoader from '../motions/WaveLoader';

export default function AuthGuardLanding({ children }: BaseProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const visits = parseInt(localStorage.getItem('visit_count') || '0', 10) + 1;
    const isAuth = token && isValidToken(token);

    localStorage.setItem('visit_count', visits.toString());

    if (isAuth) {
      router.replace('/dashboard');
      return;
    }

    if (visits >= 3) {
      router.replace('/auth/login');
      return;
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-dvh bg-background">
        <div>
          <WaveLoader />
        </div>
      </div>
    );

  return <>{children}</>;
}
