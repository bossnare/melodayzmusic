'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isValidToken } from '@/libs/auth/isValidToken';
import type { BaseProps } from '@/types/base.interface';
import { Loader } from '../motions/Loader';

export default function AuthGuardLanding({ children }: BaseProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const isVisited = localStorage.getItem('visited_before');
    const isAuth = !!token && isValidToken(token);

    if (isAuth) router.replace('/dashboard');

    if (!isVisited) {
      localStorage.setItem('visited_before', 'true');
      setIsLoading(false);
      router.push('/')
    }

    if (isVisited && !isAuth) {
      router.push('/auth/login');
    }

  }, [router]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-dvh bg-background">
        <Loader className="border-foreground/50 size-8 border-6" />
      </div>
    ); 

  return <>{children}</>;
}
