'use client';

import { useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { useAudioStore } from '@/store/audioStore';

export const PlayerProgress = () => {
  const audioRef = useAudioStore((s) => s.audioRef);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // handle progress bar
  useEffect(() => {
    const audio = audioRef;
    if (!audio || !progressRef.current) return;

    const handleTimeUpdate = throttle(() => {
      const { currentTime, duration } = audio;
      const value = (currentTime / duration) * 100;
      progressRef.current!.style.width = `${value}%`;
    }, 300);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [audioRef]);

  return <div ref={progressRef} className="h-full bg-foreground"></div>;
};
