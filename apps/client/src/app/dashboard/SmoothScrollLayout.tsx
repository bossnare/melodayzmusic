'use client';

import type { BaseProps } from '@/types/base.interface';
import Lenis from 'lenis';
import { useEffect } from 'react';

const SmoothScrollLayout = ({ children }: BaseProps) => {
  useEffect(() => {
    const wrapper = document.querySelector('#main-content') as HTMLDivElement;
    if (!wrapper) return;
    const lenis = new Lenis({
      wrapper,
      content: wrapper,
      autoRaf: true,
      duration: 1.2,
      orientation: 'vertical',
      smoothTouch: true,
      gestureOrientation: 'vertical',
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div
      id="main-content"
      className="flex-1 overflow-y-auto scrollbar-none transition-all duration-200 ease-in-out will-change-transform h-dvh lg:ml-62 xl:ml-64"
    >
      {children}
    </div>
  );
};

export default SmoothScrollLayout;
