'use client';

import { Aside } from '@/components/Aside';
import { Header } from '@/components/Header';
import { NavBottom } from '@/components/NavBottom';
import NavMobile from '@/components/NavMobile';
import Player from '@/components/SongPlayer';
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
      <Aside />
      <motion.div
        style={{ y: smoothY }}
        id="main-content"
        className="flex-1 overflow-y-auto scrollbar-none [scroll-gutter:stable] [scroll-snap-type:x_mandatory] transition-all duration-200 ease-in-out will-change-transform dark:bg-gray-950  h-dvh xl:ml-64"
      >
        <Header />
        <NavMobile />
        {/* Main content */}
        <main className="h-auto px-4 sm:px-6">{children}</main>
      </motion.div>
      {/* NavBottom -- Player and Navigation on mobile */}
      <nav className="fixed inset-x-0 bottom-0 h-auto px-2 border-t lg:px-4 z-8 border-t-gray-200 dark:border-t-gray-800 lg:h-25 bg-gray-50 dark:bg-gray-950">
        <NavBottom />
        <Player />
      </nav>

      {/* modal */}
      {/* <Player />
      <SongUpload /> */}
    </div>
  );
}
