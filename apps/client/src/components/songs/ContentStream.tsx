'use client';

// import api from '@/libs/api';
import { useUser } from '@/api/user.api';
import { type SongInterface as Song } from '@/types/songs/song.interface';
import { getNameRoots } from '@/utils/get-name.strings';
import AlbumStream from './ui/AlbumStream';
import { MemoAlbumCard, MemoVibeCard } from './ui/SongCard';
import TopArtist from './ui/TopArtist';
import VibeStream from './ui/VibeStream';

type Props = { songs: Song[] };

export const ContentStream = ({ songs }: Props) => {
  const { data: user } = useUser();

  const firstPseudo = getNameRoots(user?.pseudo);
  const twoPseudo = getNameRoots(user?.pseudo, { parts: 2 });

  return (
    <div className="flex flex-col space-y-16 lg:space-y-16 lg:pb-80">
      {/* Vibes card */}
      <VibeStream pseudo={twoPseudo}>
        {songs.map((song) => (
          <MemoVibeCard key={song.id} song={song} />
        ))}
      </VibeStream>
      {/* Albums card */}
      <AlbumStream>
        {songs.reverse().map((song) => (
          <MemoAlbumCard key={song.id} song={song} />
        ))}
      </AlbumStream>
      {/* Top Artists */}
      <TopArtist pseudo={firstPseudo}>
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="rounded-full aspect-square bg-muted"
          ></div>
        ))}
      </TopArtist>
    </div>
  );
};
