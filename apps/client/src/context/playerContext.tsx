'use client';

import { useToggle } from '@/hooks/use-toggle';
import { createContext, useContext, useState, ReactNode } from 'react';
import type { SongInterface } from '@/types/songs/song.interface';
import { useEffect, useRef } from 'react';
import ColorThief from 'colorthief';
import Image from 'next/image';
import PlayerTitleSync from '@/app/services/player-title-sync';

type PlayerContextType = {
  setTrue: () => void;
  setFalse: () => void;
  show: boolean;
  isPlaying: boolean;
  togglePlaying: () => void;
  playSong: (song: SongInterface | null) => void;
  currentSong: SongInterface | null;
  togglePlay: () => void;
  dominantColor: string | null;
  secondaryColor: string | null;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const { value: show, setTrue, setFalse } = useToggle();
  const {
    value: isPlaying,
    toggle: togglePlaying,
    setTrue: setIsPlaying,
    setFalse: setIsPlayingFalse,
  } = useToggle();
  const [currentSong, setCurrentSong] = useState<SongInterface | null>(null);
  const [dominantColor, setDominantColor] = useState<string | null>(null);
  const [secondaryColor, setSecondaryColor] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
  });

  const playSong = (song: SongInterface | null) => {
    if (!audioRef.current) return;
    if (currentSong?.id !== song?.id) {
      setCurrentSong(song);
      audioRef.current.src = song?.audioUrl || '';
    }
    audioRef.current.play();
    setIsPlaying();
  };

  const pauseSong = () => {
    audioRef.current?.pause();
    setIsPlayingFalse();
  };

  const togglePlay = () => {
    if (isPlaying) pauseSong();
    else playSong(currentSong);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('ended', () => {
      setIsPlayingFalse();
    });

    return () => {
      audio.removeEventListener('ended', () => {
        setIsPlayingFalse();
      });
    };
  }, [setIsPlayingFalse]);

  return (
    <PlayerContext
      value={{
        // ux
        setTrue,
        setFalse,
        show,
        // song
        isPlaying,
        togglePlaying,
        currentSong,
        playSong,
        togglePlay,
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
