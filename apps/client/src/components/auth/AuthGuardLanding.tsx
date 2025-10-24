'use client';

import { isValidToken } from '@/lib/auth/isValidToken';
import type { BaseProps } from '@/types/base.interface';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import WaveLoader from '../motions/WaveLoader';

export default function AuthGuardLanding({ children }: BaseProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const isAuth = token && isValidToken(token);

    if (isAuth) {
      router.replace('/dashboard');
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
