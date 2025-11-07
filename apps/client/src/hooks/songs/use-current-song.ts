import { useAudioStore } from '@/store/audioStore';
import { useMemo } from 'react';

export const useCurrentSong = () => {
  const currentSong = useAudioStore((s) => s.currentSong);

  const { title, artist, cover, username } = useMemo(() => {
    if (!currentSong)
      return {
        title: 'Inconnue',
        artist: 'Artiste inconnu',
        cover: '/img/fallback/player_cover_fallback.png',
        username: 'Inconnu'
      };

    return {
      title: currentSong.title,
      artist: currentSong.artist,
      cover: currentSong.songCover.coverUrl,
      username: currentSong.userOwner.username
    };
  }, [currentSong]);

  return { title, artist, cover, username };
};
