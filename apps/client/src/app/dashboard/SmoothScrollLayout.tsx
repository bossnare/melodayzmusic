'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import type { BaseProps } from '@/types/base.interface';

const SmoothScrollLayout = ({ children }: BaseProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      wrapper: document.querySelector('#main-content') as HTMLDivElement,
      content: document.querySelector('#main-content') as HTMLDivElement,
      duration: 1,
      // touchMultiplier: 1,
      // wheelMultiplier: 1.5,
      // smoothWheel: true,
      lerp: 0.08,
      syncTouch: true,
      syncTouchLerp: 0.75,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
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
      className="flex-1 overflow-y-auto touch-pan-y scrollbar-none transition-all duration-200 ease-in-out will-change-transform h-dvh lg:ml-62 xl:ml-64"
    >
      {children}
    </div>
  );
};

export default SmoothScrollLayout;
