import { create } from 'zustand';
import type { SongInterface } from '@/types/songs/song.interface';

interface AudioState {
  audioRef: HTMLAudioElement;
  play: (song: SongInterface) => void;
  pause: () => void;
  isPlaying: boolean;
  currentSong: SongInterface | null;
  togglePlaying: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  // setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  isCurrentSong: (id: string) => boolean;
  progress: number;
  setProgress: (progress: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  togglePlay: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  audioRef: new Audio(),
  currentSong: null,
  isPlaying: false,
  isLoading: false,
  progress: 0,

  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  isCurrentSong: (id: string) => get().currentSong?.id === id,
  setProgress: (progress: number) => set({ progress }),

  // function
  play: async (song: SongInterface) => {
    const audio = get().audioRef;
    try {
      set({ isLoading: true });
      if (audio.src !== song.audioUrl) audio.src = song.audioUrl;
      await audio.play();
      set({ currentSong: song });
      set({ isPlaying: true });
      set({ isLoading: false });
    } catch (e) {
      set({ isPlaying: false });
      audio.pause();
      console.error(e);
    }
  },

  pause: () => {
    get().audioRef.pause();
  },

  togglePlay: () => {
    const audio = get().audioRef;
    if (audio.paused) audio.play();
    else audio.pause();
  },
  // setAudioRef: ()
}));
