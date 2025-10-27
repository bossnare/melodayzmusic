'use client';

import { useToggle } from '@/hooks/use-toggle';
import {
  createContext,
  useContext,
  // useState,
  ReactNode,
  // useCallback,
} from 'react';

type PlayerContextType = {
  setTrue: () => void;
  setFalse: () => void;
  show: boolean;
  isPlaying: boolean;
  togglePlaying: () => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const { value: show, setTrue, setFalse } = useToggle();
  const { value: isPlaying, toggle: togglePlaying } = useToggle();

  return (
    <PlayerContext
      value={{
        setTrue,
        setFalse,
        show,
        isPlaying,
        togglePlaying,
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
