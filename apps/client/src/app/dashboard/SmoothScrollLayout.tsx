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
      alwaysShowTracks: false,
    });

    return () => scrollbar.destroy();
  }, []);

  return (
    <div ref={scrollRef} id="main-content" className="h-dvh">
      {children}
    </div>
  );
};

export default SmoothScrollLayout;
