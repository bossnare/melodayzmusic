import { useAudioStore } from '@/store/audioStore';
import { useMemo } from 'react';

export const useCurrentSong = () => {
  const currentSong = useAudioStore((s) => s.currentSong);

  const { title, artist, cover } = useMemo(() => {
    if (!currentSong)
      return {
        title: 'Inconnue',
        artist: 'Artiste inconnu',
        cover: '/img/fallback/player_cover_fallback.png',
      };

    return {
      title: currentSong.title,
      artist: currentSong.artist,
      cover: currentSong.songCover.coverUrl,
    };
  }, [currentSong]);

  return { title, artist, cover };
};
