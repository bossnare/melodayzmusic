'use client';

import { useToggle } from '@/hooks/use-toggle';
import { createContext, useContext, useState } from 'react';
import { type BaseProps } from '@/types/base.interface';
import { useEffect, useRef } from 'react';
import ColorThief from 'colorthief';
import Image from 'next/image';
import PlayerTitleSync from '@/app/services/player-title-sync';
import { useAudioStore } from '@/store/audioStore';

type PlayerContextType = {
  setTrue: () => void;
  setFalse: () => void;
  show: boolean;
  dominantColor: string | null;
  secondaryColor: string | null;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: BaseProps) {
  // for overlay player
  const { value: show, setTrue, setFalse } = useToggle();
  // for song
  const [dominantColor, setDominantColor] = useState<string | null>(null);
  const [secondaryColor, setSecondaryColor] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { currentSong } = useAudioStore();

  // get song cover dominant color
  useEffect(() => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (img.naturalWidth === 0 || img.naturalHeight === 0) return; // image not loaded properly
      const colorThief = new ColorThief();
      const [color, second] = colorThief.getPalette(img, 2);
      setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      setSecondaryColor(`rgb(${second[0]}, ${second[1]}, ${second[2]})`);
    };
    img.src = currentSong?.songCover.coverUrl || '/img/b1.jpg';
  }, [currentSong]);

  // useEffect(() => {
  //   const audio = audioRef.current;

  //   if (!audio) return;

  //   audio.addEventListener('ended', () => {
  //     setIsPlayingFalse();
  //   });

  //   return () => {
  //     audio.removeEventListener('ended', () => {
  //       setIsPlayingFalse();
  //     });
  //   };
  // }, [setIsPlayingFalse]);

  return (
    <PlayerContext
      value={{
        // ux
        setTrue,
        setFalse,
        show,
        // color
        dominantColor,
        secondaryColor,
      }}
    >
      <PlayerTitleSync />

      {children}
      <Image src="" ref={imgRef} alt="" style={{ display: 'none' }} />
    </PlayerContext>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}
