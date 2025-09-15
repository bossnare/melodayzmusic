'use client';

import { MotionButtonLeft } from '@/components/motions/motionButton';
import { NavBar } from '@/components/navigation/Navbar';
import { NavBottom } from '@/components/navigation/NavBottom';
import { Sidebar } from '@/components/navigation/Sidebar';
import Player from '@/components/songs/ui/SongPlayer';
import { SongPlayerMobile } from '@/components/songs/ui/SongPlayerMobile';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { AlignLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SmoothScrollLayout from './SmoothScrollLayout';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAtProfil, setIsAtProfil] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsAtProfil(pathname === '/dashboard/profile');
  }, [pathname]);

  return (
    <div className="flex justify-center">
      <Sheet>
        {/* real wrapper */}
        <div className="flex-1 overflow-hidden transition-all duration-200 ease-in-out h-dvh lg:ml-64 will-change-transform">
          <header
            className={cn(
              isAtProfil && 'hidden',
              'sticky inset-x-0 top-0 z-5 bg-background'
            )}
          >
            <div className="w-full px-2 py-2 border-b sm:px-4 border-border lg:border-0">
              <NavBar />
            </div>
            <nav className="left-0 flex w-full px-3 py-2 sm:px-5 lg:hidden">
              <SheetTrigger asChild>
                <MotionButtonLeft
                  className="p-0 hover:!bg-transparent hover:text-muted-foreground"
                  type="button"
                >
                  <AlignLeft className="stroke-current size-7 stroke-[2.2]" />
                </MotionButtonLeft>
              </SheetTrigger>
            </nav>
          </header>
          {/* Main Layout */}
          <SmoothScrollLayout>
            {/* Main content */}
            <main className="px-4 sm:px-6 pb-[40rem] lg:pb-80">{children}</main>
          </SmoothScrollLayout>
        </div>

        {/* SheetContent */}
        <Sidebar />
      </Sheet>

      {/* NavBottom -- Player and Navigation on mobile */}
      <SongPlayerMobile />
      <nav className="fixed inset-x-0 bottom-0 z-10 h-16 px-2 border-t shadow-lg lg:px-4 border-border lg:h-25 bg-nav">
        <NavBottom />
        <Player />
      </nav>

      {/* modal */}
      {/* <Player />
      <SongUpload /> */}
    </div>
  );
}
