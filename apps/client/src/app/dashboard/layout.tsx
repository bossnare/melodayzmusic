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
      <div className="flex-1 overflow-y-auto transition-all duration-200 ease-in-out dark:bg-gray-950 h-dvh xl:ml-64">
        <Header />
        {/* Main content */}
        <main className="h-full px-4 sm:px-6">{children}</main>
        {/* NavBottom -- Player and Navigation on mobile */}
        <nav
          className="fixed inset-x-0 bottom-0 md:mr-[16px] h-auto px-2 border-t 
        z-8 border-t-gray-200 dark:border-t-gray-800 md:h-20 bg-gray-50 dark:bg-gray-950"
        >
          <NavBottom />
        </nav>
      </div>

      {/* modal */}
      {/* <Player />
      <SongUpload /> */}
    </div>
  );
}
