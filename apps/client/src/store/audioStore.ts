import { create } from 'zustand';
import type { SongInterface } from '@/types/songs/song.interface';

interface AudioState {
  audioRef: HTMLAudioElement | null;
  initAudio: () => void;
  play: (song: SongInterface) => void;
  pause: () => void;
  isPlaying: boolean;
  currentSong: SongInterface | null;
  togglePlaying: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  isLoading: boolean;
  isCurrentSong: (id: string) => boolean;
  setIsLoading: (isLoading: boolean) => void;
  togglePlay: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  audioRef: null,
  initAudio: () => {
    if (typeof window === 'undefined') return;
    if (!get().audioRef) set({ audioRef: new Audio() });
  },
  currentSong: null,
  isPlaying: false,
  isLoading: false,

  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  isCurrentSong: (id: string) => get().currentSong?.id === id,

  // function
  play: async (song: SongInterface) => {
    set({ isLoading: true });
    let audio = get().audioRef;
    if (!audio) {
      audio = new Audio();
      set({ audioRef: audio });
    }

    try {
      if (audio.src !== song.audioUrl) {
        audio.src = song.audioUrl;
        audio.load();
      }
      await audio.play();
      set({ isLoading: false, currentSong: song, isPlaying: true });
    } catch (e) {
      set({ isPlaying: false });
      audio.pause();
      console.error(e);
    }
  },

  pause: () => {
    get().audioRef?.pause();
    set({ isPlaying: false });
  },

  togglePlay: () => {
    const audio = get().audioRef;
    if (audio?.paused) audio.play();
    else audio?.pause();
  },
}));
