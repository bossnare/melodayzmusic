// import Image from 'next/image';
'use client';

import { DashboardLayout } from '@/components/Layout';

export default function Home() {
  return (
    <div className="text-lg text-center p-2 font-semibold text-blue-600">
      <DashboardLayout />
    </div>
  );
}
