'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import { OtpOverlay } from '@/components/auth/OtpOverlay';
import { MotionButtonLeft } from '@/components/motions/motionButton';
import { NavBar } from '@/components/navigation/Navbar';
import { NavBottom } from '@/components/navigation/NavBottom';
import NavProfile from '@/components/navigation/NavProfile';
import { Sidebar } from '@/components/navigation/Sidebar';
import MiniPlayer from '@/components/songs/ui/MiniPlayer';
import MiniPlayerMobile from '@/components/songs/ui/MiniPlayerMobile';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { AlignLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import RefreshWrapper from './pull-to-refresh';
import SmoothScrollLayout from './SmoothScrollLayout';
import { fetcher } from '@/utils/fetcher';
import { OverlayPlayer, Player } from '@/components/songs/ui/overlay-player';
import { usePlayer } from '@/context/playerContext';
import { waitVibrate } from '@/utils/vibration';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAtProfil, setIsAtProfil] = useState(false);
  const [isAtHome, setIsAtHome] = useState(false);
  const pathname = usePathname();

  const { user, fetchMe, isFetchingMe } = useUser();

  const [open, setOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('');

  const { show } = usePlayer();

  useEffect(() => {
    const handleCheckAccount = async () => {
      try {
        const data = await fetcher('/auth/me/verify');
        setIsVerified(Boolean(data.verified));
        setEmail(data.email);
      } catch (e) {
        console.error(e);
      }
    };

    handleCheckAccount();
  }, []);

  useEffect(() => {
    setIsAtProfil(pathname === '/dashboard/profile');
    setIsAtHome(pathname === '/dashboard');
  }, [pathname]);

  useEffect(() => {
    const ignored = sessionStorage.getItem('ignore_otp') === 'true';
    if (ignored) {
      setOpen(false);
    } else {
      if (!isVerified) {
        setOpen(true);
      }
    }
  }, [isVerified]);

  return (
    <AuthGuard>
      <div className="flex justify-center">
        <Sheet>
          {/* real wrapper */}
          <div className="flex-1 overflow-hidden transition-all duration-200 ease-in-out h-dvh lg:ml-64 will-change-transform">
            <header className="sticky inset-x-0 top-0 z-5 bg-background">
              {!isAtProfil && (
                <div className="w-full px-2 py-2 border-b sm:px-4 border-border lg:border-0">
                  <NavBar fetchMeAction={fetchMe} isAtHome={isAtHome} />
                </div>
              )}
              {isAtProfil && <NavProfile />}
              <nav className="left-0 flex w-full px-2 py-1 sm:px-4 lg:hidden">
                {isAtHome && (
                  <SheetTrigger asChild>
                    <MotionButtonLeft
                      onClick={() => {
                        fetchMe();
                        waitVibrate();
                      }}
                      className="p-1 hover:bg-transparent! hover:text-muted-foreground"
                      type="button"
                    >
                      <AlignLeft className="stroke-current size-8 stroke-[2.2]" />
                    </MotionButtonLeft>
                  </SheetTrigger>
                )}
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
                    'px-4 pb-120 sm:px-6 rounded-[6px] bg-linear-to-b from-background to-muted/50 dark:from-background dark:to-background/50 mt-[1.5px]'
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
        <OverlayPlayer open={show}>
          <Player />
        </OverlayPlayer>

        <MiniPlayerMobile />
        <nav
          style={{ boxShadow: '0 -8px 8px -5px rgba(0, 0, 0, 0.06)' }}
          className="fixed inset-x-0 bottom-0 z-10 h-16 px-2 border-t lg:shadow-lg lg:px-4 border-border lg:h-25 bg-nav/90 dark:bg-nav/90 dark:lg:bg-nav/98 lg:backdrop-blur-xs lg:bg-nav backrop-blur-sm"
        >
          <NavBottom />
          <MiniPlayer />
        </nav>

        <OtpOverlay email={email} open={open} setOpen={setOpen} />
      </div>
    </AuthGuard>
  );
}
