import { useAudioStore } from '@/store/audioStore';
import { useEffect } from 'react';

function HandleEndedSong() {
  const { audioRef, setIsPlaying } = useAudioStore();

  useEffect(() => {
    const audio = audioRef;

    if (!audio) return;

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener('ended', () => {
        setIsPlaying(false);
      });
    };
  }, [audioRef, setIsPlaying]);

  return null;
}

export { HandleEndedSong };
