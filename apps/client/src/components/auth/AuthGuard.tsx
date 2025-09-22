'use client';

import { isValidToken } from '@/libs/auth/isValidToken';
import { type BaseProps } from '@/types/base.interface';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

    if (requireAuth && !isAuth) router.push(redirectTo);
    else if (!requireAuth && isAuth) router.push('/dashboard');
    else setIsLoading(false);
  }, [redirectTo, requireAuth, router]);

  if (isLoading) return null; // na loader kely fotsiny

  return <>{children}</>;
}
