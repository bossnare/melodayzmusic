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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('access_token');
        const isAuth = !!token && isValidToken(token);

        setIsAuthenticated(isAuth);

        if (requireAuth && !isAuthenticated) {
          router.push(redirectTo);
          return;
        }

        if (!requireAuth && isAuthenticated) {
          router.push('/dashboard');
          return;
        }
      } catch (e) {
        console.log(e);
        setIsAuthenticated(false);
        if (requireAuth) {
          router.push(redirectTo);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [redirectTo, requireAuth, router, isAuthenticated]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (requireAuth && !isAuthenticated) {
    return null; // or a redirect component
  }

  if (!requireAuth && isAuthenticated) {
    return null; // or a redirect component
  }

  return <>{children}</>;
}
