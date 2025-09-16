'use client';

import type { BaseProps } from '@/types/base.interface';
import { useEffect, useRef } from 'react';
import Scrollbar from 'smooth-scrollbar';

const SmoothScrollLayout = ({ children }: BaseProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    if (window.innerWidth >= 768) {
     Scrollbar.init(scrollRef.current, {
      damping: 0.06, // inertia feel
      continuousScrolling: true,
      renderByPixels: true,
      alwaysShowTracks: false,
    });
    }

    // return () => scrollbar.destroy();
  }, []);

  return (
    <div ref={scrollRef} id="main-scroll" className="h-dvh overflow-y-auto scrollbar-none touch-pan-y">
      {children}
    </div>
  );
};

export default SmoothScrollLayout;
