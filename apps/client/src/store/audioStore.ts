import { create } from 'zustand';
import type { SongInterface } from '@/types/songs/song.interface';

interface AudioState {
  isPlaying: boolean;
  setSong: (song: SongInterface) => void;
  currentSong: SongInterface | null;
  togglePlaying: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  // setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  isCurrentSong: (id: string) => boolean;
  progress: number;
  setProgress: (progress: number) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  audio: null,
  currentSong: null,
  isPlaying: false,
  isLoading: false,
  progress: 0,
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSong: (song) =>
    set({
      currentSong: song,
    }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  isCurrentSong: (id: string) => get().currentSong?.id === id,
  setProgress: (progress: number) => set({ progress }),
}));
