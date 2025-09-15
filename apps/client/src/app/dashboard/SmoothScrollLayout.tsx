'use client';

import type { BaseProps } from '@/types/base.interface';
import { useEffect, useRef } from 'react';
import Scrollbar from 'smooth-scrollbar';

const SmoothScrollLayout = ({ children }: BaseProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    Scrollbar.init(scrollRef.current, {
      damping: 0.0001, // inertia feel
      renderByPixels: true,
      alwaysShowTracks: false,
    });
  }, []);

  return (
    <div ref={scrollRef} id="main-content" className="h-full">
      {children}
    </div>
  );
};

export default SmoothScrollLayout;
