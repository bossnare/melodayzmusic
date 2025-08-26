'use client';

import { Header } from '@/components/Header';
import { MotionButtonLeft } from '@/components/motions/motionButton';
import { NavBottom } from '@/components/NavBottom';
import { Sidebar } from '@/components/Sidebar';
import Player from '@/components/songs/ui/SongPlayer';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { AlignLeft } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, {
    damping: 25,
    stiffness: 120,
    mass: 0.5,
  });

  return (
    <div className="flex justify-center">
      <Sheet>
        {/* Main Layout */}
        <motion.div
          style={{ y: smoothY }}
          id="main-content"
          className="flex-1 overflow-y-auto scrollbar-none [scroll-gutter:stable] [scroll-snap-type:x_mandatory] transition-all duration-200 ease-in-out will-change-transform dark:bg-gray-950 h-dvh lg:ml-64"
        >
          <Header />
          <nav className="sticky inset-x-0 top-0 left-0 flex px-1 py-1 sm:px-6 lg:hidden">
            <SheetTrigger asChild>
              <MotionButtonLeft type="button">
                <AlignLeft className="size-auto" />
              </MotionButtonLeft>
            </SheetTrigger>
          </nav>
          {/* Main content */}
          <main className="h-auto px-4 sm:px-6">{children}</main>
        </motion.div>
        {/* SheetContent */}
        <Sidebar />
      </Sheet>

      {/* NavBottom -- Player and Navigation on mobile */}
      <nav
        className="fixed inset-x-0 bottom-0 h-auto px-2 border-t 
      border-gray-200 lg:px-4 z-8 dark:border-gray-800 lg:h-25 
      bg-gray-50 dark:bg-gray-950"
      >
        <NavBottom />
        <Player />
      </nav>

      {/* modal */}
      {/* <Player />
      <SongUpload /> */}
    </div>
  );
}
