'use client';

import { Aside } from '@/components/Aside';
import { Header } from '@/components/Header';
import { NavBottom } from '@/components/NavBottom';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center">
      <Aside />
      <div className="flex-1 max-w-screen-xl overflow-y-auto transition-all duration-200 ease-in-out transform-none max-h-dvh xl:ml-64">
        <Header />
        <main className="px-4 dark:bg-gray-950 sm:px-6 *:h-full">
          {children}
        </main>
        <NavBottom />
      </div>
      {/* modal */}
      {/* <Player />
      <SongUpload /> */}
    </div>
  );
}
