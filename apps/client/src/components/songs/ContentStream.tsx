'use client';

// import api from '@/libs/api';
import { type SongInterface as Song } from '@/types/songs/song.interface';
import AlbumStream from './ui/AlbumStream';
import { VibeCard, AlbumCard } from './ui/SongCard';
import VibeStream from './ui/VibeStream';
import TopArtist from './ui/TopArtist';

type Props = { songs: Song[] };

export const ContentStream = ({ songs }: Props) => {
  return (
    <div className="flex flex-col space-y-16 lg:space-y-16 lg:pb-80">
      {/* Vibes card */}
      <VibeStream>
        {songs.map((song) => (
          <VibeCard key={song.id} song={song} />
        ))}
      </VibeStream>
      {/* Albums card */}
      <AlbumStream>
        {songs.reverse().map((song) => (
          <AlbumCard key={song.id} song={song} />
        ))}
      </AlbumStream>
      {/* Top Artists */}
      <TopArtist>
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="rounded-full shadow-md aspect-square ring-3 ring-muted dark:bg-foreground/5"
          ></div>
        ))}
      </TopArtist>
    </div>
  );
};
