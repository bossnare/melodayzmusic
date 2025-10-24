'use client';

import { isValidToken } from '@/lib/auth/isValidToken';
import { type BaseProps } from '@/types/base.interface';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import WaveLoader from '../motions/WaveLoader';

export default function AuthGuard({
  children,
  requireAuth = true,
  redirectTo = '/auth/login',
}: BaseProps & { requireAuth?: boolean; redirectTo?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const isAuth = !!token && isValidToken(token);

    if (requireAuth && !isAuth) router.replace(redirectTo);
    else if (!requireAuth && isAuth) router.replace('/dashboard');
    else setIsLoading(false);
  }, [redirectTo, requireAuth, router]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-dvh bg-background">
        <div>
          <WaveLoader />
        </div>
      </div>
    ); // na Waveloader kely fotsiny

  return <>{children}</>;
}
