'use client';

import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';
import { AuthPageWrapper } from '@/components/auth/AuthWrapper';
import { Loader } from '@/components/motions/Loader';
// import {usePreviousRoute} from '@/hooks/usePreviousRoute'

export default function RegisterPage() {
  // const prevRoute = usePreviousRoute()

  return (
    <AuthPageWrapper>
      <AuthHeaderSwitch href={'/auth/login'} type="back" />
      <div className="flex flex-col items-center gap-2">
        <Loader className="size-8 lg:size-10 dark:border-secondary" />
        <span>Page en construction</span>
      </div>
    </AuthPageWrapper>
  );
}
