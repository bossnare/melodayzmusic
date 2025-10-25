'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';

type PlayerContextType = {
  setTrue: () => void;
  setFalse: () => void;
  show: boolean;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  const setTrue = useCallback(() => setShow(true), []);
  const setFalse = useCallback(() => setShow(false), []);

  return (
    <PlayerContext
      value={{
        setTrue,
        setFalse,
        show,
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
