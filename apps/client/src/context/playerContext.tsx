'use client';

import { useToggle } from '@/hooks/use-toggle';
import {
  createContext,
  useEffect,
  useRef,
  useContext,
  useState,
  ReactNode,
} from 'react';
import type { SongInterface } from '@/types/songs/song.interface';
import ColorThief from 'colorthief';

type PlayerContextType = {
  setTrue: () => void;
  setFalse: () => void;
  show: boolean;
  isPlaying: boolean;
  togglePlaying: () => void;
  currentSong: SongInterface | null;
  setCurrentSong: (song: SongInterface | null) => void;
  dominantColor: string | null;
  imgRef: React.RefObject<HTMLImageElement | null>;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const { value: show, setTrue, setFalse } = useToggle();
  const { value: isPlaying, toggle: togglePlaying } = useToggle();
  const [currentSong, setCurrentSong] = useState<SongInterface | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [dominantColor, setDominantColor] = useState<string | null>(null);

  // get song cover dominant color
  useEffect(() => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    img.onload = () => {
      if (img.naturalWidth === 0 || img.naturalHeight === 0) return; // image not loaded properly
      const colorThief = new ColorThief();
      const color = colorThief.getPalette(img, 2)[0];
      setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  }, [imgRef]);

  return (
    <PlayerContext
      value={{
        setTrue,
        setFalse,
        show,
        isPlaying,
        togglePlaying,
        currentSong,
        setCurrentSong,
        dominantColor,
        imgRef,
      }}
    >
      {children}
    </PlayerContext>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}
