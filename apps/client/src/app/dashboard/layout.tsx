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
    <div className="relative flex w-full">
      <Aside />
      <div className="w-full transition-all duration-200 md:grow">
        <Header />
        <main className="dark:bg-gray-950 px-4 sm:px-6 *:min-h-dvh">
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
