'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import { OtpOverlay } from '@/components/auth/OtpOverlay';
import { MotionButtonLeft } from '@/components/motions/motionButton';
import { NavBar } from '@/components/navigation/Navbar';
import { NavBottom } from '@/components/navigation/NavBottom';
import NavProfile from '@/components/navigation/NavProfile';
import { Sidebar } from '@/components/navigation/Sidebar';
import Player from '@/components/songs/ui/SongPlayer';
import { SongPlayerMobile } from '@/components/songs/ui/SongPlayerMobile';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { AlignLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import RefreshWrapper from './pull-to-refresh';
import SmoothScrollLayout from './SmoothScrollLayout';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAtProfil, setIsAtProfil] = useState(false);
  const pathname = usePathname();

  const { user, fetchMe, isFetchingMe } = useUser();

  useEffect(() => {
    setIsAtProfil(pathname === '/dashboard/profile');
  }, [pathname]);

  return (
    <AuthGuard>
      <div className="flex justify-center">
        <Sheet>
          {/* real wrapper */}
          <div className="flex-1 overflow-hidden transition-all duration-200 ease-in-out h-dvh lg:ml-64 will-change-transform">
            <header className="sticky inset-x-0 top-0 z-5 bg-background">
              {!isAtProfil && (
                <div className="w-full px-2 py-2 border-b sm:px-4 border-border lg:border-0">
                  <NavBar />
                </div>
              )}
              {isAtProfil && <NavProfile />}
              <nav className="left-0 flex w-full px-3 py-1 sm:px-5 lg:hidden">
                <SheetTrigger asChild>
                  <MotionButtonLeft
                    onClick={fetchMe}
                    className="p-1 hover:!bg-transparent hover:text-muted-foreground"
                    type="button"
                  >
                    <AlignLeft className="stroke-current size-8 stroke-[2.2]" />
                  </MotionButtonLeft>
                </SheetTrigger>
              </nav>
            </header>
            {/* Main Layout */}
            <RefreshWrapper
              onRefresh={async () => {
                alert('Refresh');
              }}
            >
              <SmoothScrollLayout>
                {/* Main content */}
                <main
                  className={cn(
                    !isAtProfil && 'pt-10',
                    'px-4 pb-[30rem] sm:px-6'
                  )}
                >
                  {children}
                </main>
              </SmoothScrollLayout>
            </RefreshWrapper>
          </div>

          {/* SheetContent */}
          <Sidebar user={user} isFetchingMe={isFetchingMe} />
        </Sheet>

        {/* NavBottom -- Player and Navigation on mobile */}
        <SongPlayerMobile />
        <nav
          style={{ boxShadow: '0 -8px 8px -5px rgba(0, 0, 0, 0.06)' }}
          className="fixed inset-x-0 bottom-0 z-10 min-h-16 px-2 border-t shadow-lg lg:px-4 border-border lg:h-25 bg-nav backrop-blur-sm pb-10 md:pb-0"
        >
          <NavBottom />
          <Player />
        </nav>

        <OtpOverlay />
      </div>
    </AuthGuard>
  );
}
