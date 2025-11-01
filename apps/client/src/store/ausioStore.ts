import { create } from 'zustand';
import type { SongInterface } from '@/types/songs/song.interface';

interface AudioState {
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  // togglePlaying: () => void;
  setAudio: (audio: SongInterface) => void;
  currentSong: SongInterface | null;
  // togglePlay: () => void;
  isLoading: boolean;
  isCurrentSong: (id: string) => boolean;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  audio: null,
  currentSong: null,
  isPlaying: false,
  isLoading: false,
  setAudio: (audio) =>
    set({
      currentSong: audio,
    }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  isCurrentSong: (id: string) => get().currentSong?.id === id,
}));
