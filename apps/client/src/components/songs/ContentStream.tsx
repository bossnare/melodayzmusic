'use client';

// import api from '@/libs/api';
import { SongInterface as Song } from '@/types/songs/song.interface';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { DashboardHomeSkeleton } from '@/components/skeleton/DashboardHomeSkeleton';
import AlbumStream from './ui/AlbumStream';
import { VibeCard, AlbumCard } from './ui/SongCard';
import VibeStream from './ui/VibeStream';
import TopArtist from './ui/TopArtist';
import axios from 'axios';

export const ContentStream = () => {
  const fetchContentStream = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_MOCK_API}/song`,
      { timeout: 10000 }
    );
    console.log(response.data);
    const data = response.data;
    return data;
  };

  const options = {
    queryKey: ['songs'],
    queryFn: fetchContentStream,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowsFocus: true,
  };
  const navTarget = 'dashboard';

  useEffect(() => {
    const savedScroll = sessionStorage.getItem(`scroll-${navTarget}`);
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${navTarget}`, String(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const {
    data: songs,
    isPending,
    isError,
    // refetch,
  } = useQuery<Song[], Error>(options);

  if (isError) {
    return <div>Error !</div>;
    // return <UserProfileOverlay refetch={refetch} />;
  }

  if (isPending) {
    return <DashboardHomeSkeleton />;
  }

  return (
    <div className="flex flex-col pt-6 space-y-14 lg:space-y-16">
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
            className="rounded-full aspect-square ring-3 ring-muted dark:bg-foreground/5"
          ></div>
        ))}
      </TopArtist>
    </div>
  );
};
