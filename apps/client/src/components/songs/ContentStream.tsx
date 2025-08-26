'use client';

import api from '@/libs/api';
import { SongInterface as Song } from '@/types/songs/song.interface';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { DashboardHomeSkeleton } from '../skeleton/DashboardHomeSkeleton';
import AlbumStream from './ui/AlbumStream';
import { SongCard } from './ui/SongCard';
import VibeStream from './ui/VibeStream';

export const ContentStream = () => {
  const fetchContentStream = async () => {
    const response = await api.get('/song', { timeout: 10000 });
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
    <div className="flex flex-col pt-8 space-y-10 lg:space-y-15 pb-60 md:pb-50">
      <section>
        <h2 className="flex items-center gap-2 text-section sm:px-1">
          Top Artists
        </h2>
        <div
          className="max-w-full h-20 flex-nowrap
         flex items-center sm:px-1 *:size-16 md:*:size-22
      *:bg-gray-100 dark:*:bg-gray-900 gap-4 *:rounded-full"
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
      {/* Vibes card */}
      <VibeStream>
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </VibeStream>
      {/* Albums card */}
      <AlbumStream>
        {songs.reverse().map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </AlbumStream>
    </div>
  );
};
