'use client';

import { usePlayer } from '@/context/playerContext';
import { useAudioStore } from '@/store/audioStore';
import { useEffect } from 'react';
import { useCurrentSong } from '@/hooks/songs/use-current-song';

export default function PlayerTitleSync() {
  const { currentSong } = useAudioStore();
  const { dominantColor } = usePlayer();
  const { title, artist } = useCurrentSong();

  useEffect(() => {
    const meta = document.querySelector("meta[name='theme-color']");

    if (currentSong) {
      document.title = `${title} - ${artist}`;
      meta?.setAttribute('content', `${dominantColor}`); // browser top bar color
    } else {
      document.title = 'MelodayzMusic - Feel the Beat, Anywhere You Go';
      // meta?.setAttribute('content', `#000`); // browser top bar color if nothing currentSong
    }
  }, [currentSong, title, artist, dominantColor]);

  return null;
}
