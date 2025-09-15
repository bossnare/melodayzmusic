'use client';

import type { BaseProps } from '@/types/base.interface';
import { useEffect, useRef } from 'react';
import Scrollbar from 'smooth-scrollbar';

const SmoothScrollLayout = ({ children }: BaseProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollbar = Scrollbar.init(scrollRef.current, {
      damping: 0.08, // inertia feel
      renderByPixels: true,
      continuousScrolling: true,
      delegateTo: document,
      alwaysShowTracks: false,
    });

    return () => scrollbar.destroy();
  }, []);

  return (
    <div
      ref={scrollRef}
      id="main-content"
      className="h-full overflow-hidden scrollbar-none"
    >
      {children}
    </div>
  );
};

export default SmoothScrollLayout;
