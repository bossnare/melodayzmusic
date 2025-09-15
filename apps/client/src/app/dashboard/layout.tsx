'use client';

import { MotionButtonLeft } from '@/components/motions/motionButton';
import { Header } from '@/components/navigation/Header';
import { NavBottom } from '@/components/navigation/NavBottom';
import { Sidebar } from '@/components/navigation/Sidebar';
import Player from '@/components/songs/ui/SongPlayer';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { AlignLeft } from 'lucide-react';
import SmoothScrollLayout from './SmoothScrollLayout';
import { SongPlayerMobile } from '@/components/songs/ui/SongPlayerMobile';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNotAtProfil, setIsNotAtProfil] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsNotAtProfil(pathname !== '/dashboard/profile');
  }, [pathname]);

  return (
    <div className="flex justify-center">
      <Sheet>
        {/* Main Layout */}
        <SmoothScrollLayout>
          {isNotAtProfil && (
            <>
              <Header />
              <nav className="sticky inset-x-0 top-0 left-0 flex px-3 py-2 sm:px-5 lg:hidden">
                <SheetTrigger asChild>
                  <MotionButtonLeft
                    className="p-0 hover:!bg-transparent hover:text-muted-foreground"
                    type="button"
                  >
                    <AlignLeft className="size-7 stroke-3 stroke-current" />
                  </MotionButtonLeft>
                </SheetTrigger>
              </nav>
            </>
          )}

          {/* Main content */}
          <main className="px-4 sm:px-6">{children}</main>
        </SmoothScrollLayout>

        {/* SheetContent */}
        <Sidebar />
      </Sheet>

      {/* NavBottom -- Player and Navigation on mobile */}
      <SongPlayerMobile />
      <nav className="fixed inset-x-0 bottom-0 h-16 px-2 border-t lg:px-4 z-8 border-border lg:h-25 bg-nav shadow-lg">
        <NavBottom />
        <Player />
      </nav>

      {/* modal */}
      {/* <Player />
      <SongUpload /> */}
    </div>
  );
}
