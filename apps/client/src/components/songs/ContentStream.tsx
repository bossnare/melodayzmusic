'use client';

// import api from '@/libs/api';
import { type SongInterface as Song } from '@/types/songs/song.interface';
import AlbumStream from './ui/AlbumStream';
import { VibeCard, AlbumCard } from './ui/SongCard';
import VibeStream from './ui/VibeStream';
import TopArtist from './ui/TopArtist';
import {useUser} from '@/hooks/useUser'
import {useEffect} from 'react'
import {getNameRoots} from '@/utils/get-name.strings'

type Props = { songs: Song[] };

export const ContentStream = ({ songs }: Props) => {
  const {user, fetchMe} = useUser()

  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  const firstPseudo = getNameRoots(user?.pseudo)
  const twoPseudo = getNameRoots(user?.pseudo, {parts: 2})

  return (
    <div className="flex flex-col space-y-16 lg:space-y-16 lg:pb-80">
      {/* Vibes card */}
      <VibeStream pseudo={twoPseudo}>
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
