import { useAudioStore } from '@/store/audioStore';
import { useEffect } from 'react';

export default function PlayerTitleSync() {
  const { currentSong } = useAudioStore();

  useEffect(() => {
    if (currentSong) {
      document.title = `${currentSong.title} - ${currentSong.artist} - MelodayzMusic`;
    } else {
      document.title = 'MelodayzMusic - Feel the Beat, Anywhere You Go';
    }
  }, [currentSong]);

  return null;
}
