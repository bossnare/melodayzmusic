'use client';

import { createContext, useContext, useRef } from 'react';
import { type BaseProps } from '@/types/base.interface';

const AudioContext = createContext<HTMLAudioElement | null>(null);

export function AudioProvider({ children }: BaseProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <AudioContext value={audioRef.current}>
      {children}
      <audio ref={audioRef} />
    </AudioContext>
  );
}

export function useAudioElement() {
  const ctx = useContext(AudioContext);
  if (!ctx)
    throw new Error('useAudioElement must be used inside AudioProvider');
  return ctx;
}
