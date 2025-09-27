'use client'

import { RegisterCard } from '@/components/auth/AuthCard';
import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';
import { AuthPageWrapper } from '@/components/auth/AuthWrapper';

export const revalidate = 0;

export default function RegisterPage() {
  return (
    <AuthPageWrapper>
      <AuthHeaderSwitch href={'/auth/login'} type="back" />

      <div className="w-full lg:w-[60%]">
        <RegisterCard />
      </div>
    </AuthPageWrapper>
  );
}
