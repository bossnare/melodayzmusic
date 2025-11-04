'use client';

import { useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { useAudioStore } from '@/store/audioStore';

export const PlayerProgress = () => {
  const audioRef = useAudioStore((s) => s.audioRef);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef(0);

  // handle progress bar
  // use transform for GPU perf
  useEffect(() => {
    if (!progressRef.current) return;
    const update = () => {
      progressRef.current!.style.transform = `scaleX(${
        valueRef.current / 100
      })`;

      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    const audio = audioRef;
    if (!audio || !progressRef.current) return;

    const handleTimeUpdate = throttle(() => {
      const { currentTime, duration } = audio;
      const value = (currentTime / duration) * 100 || 0;
      valueRef.current = value;
    }, 300);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [audioRef]);

  return (
    <div
      ref={progressRef}
      className="h-full origin-left bg-foreground will-change-transform transform-gpu"
    ></div>
  );
};
