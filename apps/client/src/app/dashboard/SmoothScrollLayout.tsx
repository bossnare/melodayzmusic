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
      duration: 0.5,
      lerp: 0.5,
      easing: (t: number) => 1 - Math.pow(2, -10 * t),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      syncTouch: true,
    });

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
