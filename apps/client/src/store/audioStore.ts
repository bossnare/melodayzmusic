import { create } from 'zustand';
import type { SongInterface } from '@/types/songs/song.interface';

interface AudioState {
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  setAudio: (audio: HTMLAudioElement) => void;
  setSong: (song: SongInterface) => void;
  currentSong: SongInterface | null;
  togglePlaying: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  // setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  isCurrentSong: (id: string) => boolean;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  audio: null,
  currentSong: null,
  isPlaying: false,
  isLoading: false,
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSong: (song) =>
    set({
      currentSong: song,
    }),
  setAudio: (audio) => set({ audio: audio }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  isCurrentSong: (id: string) => get().currentSong?.id === id,
}));
