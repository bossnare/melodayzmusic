import { useAudioStore } from '@/store/audioStore';

const mediaSessionMetadata = () => {
  if ('mediaSession' in navigator) {
    const currentSong = useAudioStore.getState().currentSong;
    if (currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: '',
        artwork: [
          {
            src:
              currentSong.songCover.coverUrl ||
              '/img/fallback/player_cover_fallback.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      });
    }

    // behaviour
    navigator.mediaSession.setActionHandler('play', () => {
      useAudioStore.getState().togglePlaying();
      useAudioStore.getState().togglePlay();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      useAudioStore.getState().togglePlaying();
      useAudioStore.getState().togglePlay();
    });
  }
};

export { mediaSessionMetadata };
